'use client';

import React, { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import api from '@/lib/api';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HubNode {
  id: string;
  label: string;
  x: number; // SVG viewBox x (0–700)
  y: number; // SVG viewBox y (0–400)
  region: 'NA' | 'EU' | 'ME' | 'AS' | 'OC' | 'AF' | 'SA';
}

export interface ParcelEvent {
  from_hub: string; 
  to_hub: string;   
  parcel_id?: string;
  type?: string;
  weight?: string;
  status?: string;
}

interface FeedItem {
  id: string;
  fromId: string;
  toId: string;
  parcelId: string;
  type: string;
  weight: string;
  status: string;
  ts: number;
}

interface GlobalLogisticsMapProps {
  nodes?: HubNode[];
  fetchNextEvent?: () => Promise<ParcelEvent | null>;
  pollInterval?: number;
  maxFeedItems?: number;
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const DEFAULT_NODES: HubNode[] = [
  { id: 'NYC', label: 'New York',     region: 'NA', x: 120, y: 130 },
  { id: 'LAX', label: 'Los Angeles',  region: 'NA', x: 60,  y: 150 },
  { id: 'CHI', label: 'Chicago',      region: 'NA', x: 100, y: 135 },
  { id: 'MEX', label: 'Mexico City',  region: 'NA', x: 105, y: 190 },
  { id: 'LDN', label: 'London',       region: 'EU', x: 310, y: 100 },
  { id: 'CDG', label: 'Paris',        region: 'EU', x: 320, y: 115 },
  { id: 'FRA', label: 'Frankfurt',    region: 'EU', x: 335, y: 110 },
  { id: 'MAD', label: 'Madrid',       region: 'EU', x: 305, y: 140 },
  { id: 'AMS', label: 'Amsterdam',    region: 'EU', x: 325, y: 95 },
  { id: 'DXB', label: 'Dubai',        region: 'ME', x: 420, y: 180 },
  { id: 'BOM', label: 'Mumbai',       region: 'AS', x: 460, y: 220 },
  { id: 'DEL', label: 'Delhi',        region: 'AS', x: 465, y: 200 },
  { id: 'SIN', label: 'Singapore',    region: 'AS', x: 530, y: 270 },
  { id: 'HKG', label: 'Hong Kong',    region: 'AS', x: 540, y: 210 },
  { id: 'SHA', label: 'Shanghai',     region: 'AS', x: 560, y: 180 },
  { id: 'TKY', label: 'Tokyo',        region: 'AS', x: 610, y: 150 },
  { id: 'SYD', label: 'Sydney',       region: 'OC', x: 630, y: 340 },
  { id: 'JNB', label: 'Johannesburg', region: 'AF', x: 350, y: 320 },
  { id: 'SAO', label: 'São Paulo',    region: 'SA', x: 210, y: 310 },
];

const PARCEL_TYPES = ['Standard', 'Express', 'Fragile', 'Secure', 'Air Freight', 'Sea Cargo'];
const STATUSES     = ['DEPARTED', 'IN TRANSIT', 'ARRIVED', 'CUSTOMS', 'LAST MILE'];

// ─── Utility ──────────────────────────────────────────────────────────────────

const arcPathD = (from: HubNode, to: HubNode) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dr = Math.sqrt(dx * dx + dy * dy) * 1.2; 
  return `M${from.x},${from.y} A${dr},${dr} 0 0,1 ${to.x},${to.y}`;
};

const makeParcelId = () => 'PX' + Math.random().toString(36).substr(2, 6).toUpperCase();
const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ─── Component ────────────────────────────────────────────────────────────────

export const GlobalLogisticsMap: React.FC<GlobalLogisticsMapProps> = ({
  nodes: propNodes,
  fetchNextEvent,
  pollInterval = 3000,
  maxFeedItems = 4,
  className = '',
}) => {
  const nodes = propNodes ?? DEFAULT_NODES;
  const nodeMap = useMemo(() => {
    const m: Record<string, HubNode> = {};
    nodes.forEach(n => (m[n.id] = n));
    return m;
  }, [nodes]);

  // ── State (Persistent React State) ──────────────────────────────────────────
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const [activeArcs, setActiveArcs]   = useState<Array<{from: string, to: string, id: string}>>([]);
  const [feedItems, setFeedItems]     = useState<FeedItem[]>([]);
  const [utcTime, setUtcTime]         = useState('');
  const [statusMsg, setStatusMsg]     = useState('SYSTEM INITIALIZING...');

  // ── Stats (Derived) ─────────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    nodes: activeNodes.size,
    routes: activeArcs.length,
    transit: feedItems.length + 120 // Simulation offset for busy feel
  }), [activeNodes, activeArcs, feedItems]);

  // ── Clock ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      setUtcTime(`${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())} UTC`);
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  // ── Event Processing ────────────────────────────────────────────────────────
  const processEvent = useCallback((event: ParcelEvent) => {
    const from = nodeMap[event.from_hub];
    const to   = nodeMap[event.to_hub];
    if (!from || !to || from.id === to.id) return;

    // Update Nodes
    setActiveNodes(prev => {
      if (prev.has(from.id) && prev.has(to.id)) return prev;
      const next = new Set(prev);
      next.add(from.id);
      next.add(to.id);
      return next;
    });

    // Update Arcs
    const arcId = [from.id, to.id].sort().join('-');
    setActiveArcs(prev => {
      if (prev.some(a => a.id === arcId)) return prev;
      return [...prev, { from: from.id, to: to.id, id: arcId }];
    });

    // Update Feed
    const item: FeedItem = {
      id:       Math.random().toString(36).substr(2, 8),
      fromId:   from.id,
      toId:     to.id,
      parcelId: event.parcel_id ?? makeParcelId(),
      type:     event.type   ?? randomItem(PARCEL_TYPES),
      weight:   event.weight ?? (Math.random() * 40 + 0.5).toFixed(1) + ' kg',
      status:   event.status ?? randomItem(STATUSES),
      ts:       Date.now(),
    };

    setFeedItems(prev => [item, ...prev].slice(0, 4));
    setStatusMsg(`DISPATCH: ${from.id} → ${to.id}`);
  }, [nodeMap]);

  // ── Operation Timing (35s ON / 50m OFF) ────────────────────────────────────
  const [isOperationActive, setIsOperationActive] = useState(true);

  useEffect(() => {
    // 35 seconds of operation
    const stopTimer = setTimeout(() => {
      setIsOperationActive(false);
      setStatusMsg('SYSTEM STANDBY (BATCH CYCLE: 50m)');
    }, 35000);

    // 50 minutes of standby (3000000ms)
    const restartTimer = setTimeout(() => {
      setIsOperationActive(true);
      setStatusMsg('UPLINK RESTORED');
      // Logic to trigger a reload or just let the next interval catch it
    }, 3000000 + 35000);

    return () => {
      clearTimeout(stopTimer);
      clearTimeout(restartTimer);
    };
  }, []);

  // ── API Polling ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOperationActive) return;

    const fetcher = fetchNextEvent ?? (async () => {
      try {
        const res = await api.get('/admin/parcels/live');
        return res.data;
      } catch (error) {
        return null;
      }
    });

    // Initial cinematic seed (Nodes + Random Arcs)
    const seed = () => {
      const shuffled = [...nodes].sort(() => Math.random() - 0.5);
      const initialNodes = shuffled.slice(0, 8);
      
      initialNodes.forEach((node, i) => {
        setTimeout(() => {
          setActiveNodes(prev => new Set([...prev, node.id]));
          
          // Every second node, draw a random arc to an existing node
          if (i > 0 && i % 2 === 0) {
            const target = initialNodes[Math.floor(Math.random() * i)];
            const arcId = [node.id, target.id].sort().join('-');
            setActiveArcs(prev => [...prev, { from: node.id, to: target.id, id: arcId }]);
          }
        }, i * 200);
      });
    };
    seed();

    const interval = setInterval(async () => {
      const event = await fetcher();
      if (event) processEvent(event);
    }, pollInterval);

    return () => clearInterval(interval);
  }, [fetchNextEvent, pollInterval, processEvent, nodes]);

  return (
    <div className={`flex flex-col bg-[#080B14] text-[#7a8fae] border border-white/5 overflow-hidden font-mono shadow-2xl rounded-[2rem] ${className}`}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gmDrawArc {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes gmFadeIn {
          to { opacity: 1; }
        }
        @keyframes gmSlideIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .gm-arc-path {
          animation: gmDrawArc 1.5s ease forwards;
        }
      `}} />

      {/* Header Panel */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#c23b3b] animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.2em] text-[#c23b3b] uppercase">ParcelTrack — Global Ops Center</span>
        </div>
        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest">
          <div className="flex gap-2"><span>Nodes</span> <span className="text-white">{stats.nodes}</span></div>
          <div className="flex gap-2"><span>Routes</span> <span className="text-white">{stats.routes}</span></div>
          <div className="flex gap-2"><span>In Transit</span> <span className="text-white">{stats.transit}</span></div>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {/* Main Map Visualization */}
        <div className="flex-1 relative overflow-hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat">
          <svg
            viewBox="0 0 700 400"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="gm-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Arcs Layer */}
            <g>
              {activeArcs.map(arc => {
                const from = nodeMap[arc.from];
                const to   = nodeMap[arc.to];
                if (!from || !to) return null;
                const d = arcPathD(from, to);
                return (
                  <g key={arc.id}>
                    <path
                      d={d}
                      fill="none"
                      stroke="#c23b3b"
                      strokeWidth="0.8"
                      strokeOpacity="0.4"
                      className="gm-arc-path"
                      style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                    />
                    <circle r="2.5" fill="#ff4444" filter="url(#gm-glow)">
                      <animateMotion dur="3.5s" repeatCount="indefinite" path={d} />
                    </circle>
                  </g>
                );
              })}
            </g>

            {/* Nodes Layer */}
            <g>
              {Array.from(activeNodes).map(id => {
                const node = nodeMap[id];
                if (!node) return null;
                return (
                  <g key={node.id} filter="url(#gm-glow)">
                    <circle
                      cx={node.x} cy={node.y} r="7"
                      fill="rgba(194,59,59,0.05)"
                      stroke="#c23b3b" strokeWidth="0.5"
                    />
                    <circle
                      cx={node.x} cy={node.y} r="2.5"
                      fill="#c23b3b"
                      className="animate-pulse"
                    />
                    <text
                      x={node.x + 8} y={node.y - 4}
                      fontSize="7" fill="#7a8fae"
                      className="font-mono uppercase opacity-0 animate-[gmFadeIn_0.5s_0.3s_forwards]"
                    >
                      {node.id}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-40" />
        </div>

        {/* Live Dispatch Sidebar */}
        <div className="w-64 bg-white/5 border-l border-white/5 flex flex-col h-full overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Live Dispatch</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {feedItems.map((item) => (
              <div key={item.id} className="animate-[gmSlideIn_0.4s_ease-out_forwards] border-b border-white/5 pb-4 last:border-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-white/30">{item.parcelId}</span>
                  <span className="text-[9px] font-bold text-[#c23b3b]">{item.status}</span>
                </div>
                <div className="text-xs font-bold text-white mb-1">
                  {item.fromId} <span className="text-[#c23b3b] mx-1">→</span> {item.toId}
                </div>
                <div className="text-[9px] text-[#7a8fae] flex justify-between">
                  <span>{item.type}</span>
                  <span>{item.weight}</span>
                </div>
              </div>
            ))}
            {feedItems.length === 0 && (
              <div className="h-full flex items-center justify-center text-[9px] text-white/10 uppercase tracking-widest text-center px-4">
                Uplink established... <br/> Awaiting data stream
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 py-3 bg-white/5 border-t border-white/5 flex items-center justify-between text-[8px] font-bold tracking-widest uppercase text-white/30">
        <div className="flex gap-6">
          <span>Lat/Lon Feed: Active</span>
          <span>Status: Optimal</span>
        </div>
        <div className="flex gap-4">
          <span className="text-[#c23b3b]">{statusMsg}</span>
          <span className="text-white/60">{utcTime}</span>
        </div>
      </div>
    </div>
  );
};
