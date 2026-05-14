'use client';

import React, { useState, useEffect } from 'react';

type TransportMode = 'truck' | 'plane' | 'train';

interface TransportLoaderProps {
    mode?: TransportMode;
    autoCycle?: boolean;
    cycleDuration?: number;
    message?: string;
}

const STATUS_LABELS: Record<TransportMode, string> = {
    truck: 'Delivering your package',
    plane: 'Boarding your flight',
    train: 'Departing the station',
};

const MODES: TransportMode[] = ['truck', 'plane', 'train'];

export default function TransportLoader({
    mode: modeProp,
    autoCycle = false,
    cycleDuration = 3000,
    message,
}: TransportLoaderProps) {
    const [active, setActive] = useState<TransportMode>(modeProp ?? 'truck');

    useEffect(() => {
        if (!autoCycle) return;
        const id = setInterval(() => {
            setActive((prev) => {
                const idx = MODES.indexOf(prev);
                return MODES[(idx + 1) % MODES.length];
            });
        }, cycleDuration);
        return () => clearInterval(id);
    }, [autoCycle, cycleDuration]);

    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center min-h-[400px] bg-white/80 dark:bg-neutral-950/80 backdrop-blur-[2px]">
            <style>{`
                @keyframes tl-road-scroll   { from { transform: translateX(0); } to { transform: translateX(-80px); } }
                @keyframes tl-wheel-spin    { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes tl-truck-bob     { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
                @keyframes tl-exhaust       { 0% { opacity:0.7; transform:translateX(0) scale(1); } 100% { opacity:0; transform:translateX(-28px) scale(2.2); } }
                @keyframes tl-dash-scroll   { from { stroke-dashoffset:0; } to { stroke-dashoffset:-40; } }
                @keyframes tl-plane-glide   {
                    0%   { transform:translateX(-20px) translateY(0); }
                    25%  { transform:translateX(10px)  translateY(-5px); }
                    50%  { transform:translateX(40px)  translateY(-2px); }
                    75%  { transform:translateX(70px)  translateY(-6px); }
                    100% { transform:translateX(100px) translateY(0); }
                }
                @keyframes tl-cloud-drift   { from { transform:translateX(0); } to { transform:translateX(-200px); } }
                @keyframes tl-train-chug    { 0%,100% { transform:translateX(0); } 25% { transform:translateX(1px); } 75% { transform:translateX(-1px); } }
                @keyframes tl-track-scroll  { from { stroke-dashoffset:0; } to { stroke-dashoffset:-60; } }
                @keyframes tl-smoke-rise    { 0% { opacity:0.6; transform:translateY(0) scale(0.8); } 100% { opacity:0; transform:translateY(-22px) scale(1.6); } }
                @keyframes tl-dot-blink     { 0%,80%,100% { opacity:0.2; transform:scale(0.85); } 40% { opacity:1; transform:scale(1); } }
                @keyframes tl-label-pulse   { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
                @keyframes tl-fade-in       { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }

                .tl-scene     { animation: tl-fade-in 0.3s ease both; }
                .tl-road-scroll  { animation: tl-road-scroll  0.6s linear infinite; }
                .tl-dash-scroll  { animation: tl-dash-scroll  0.6s linear infinite; }
                .tl-truck-bob    { animation: tl-truck-bob    0.5s ease-in-out infinite; }
                .tl-wheel        { animation: tl-wheel-spin   0.5s linear infinite; }
                .tl-wheel-fast   { animation: tl-wheel-spin   0.4s linear infinite; }
                .tl-exhaust-1    { animation: tl-exhaust      1s ease-out infinite; }
                .tl-exhaust-2    { animation: tl-exhaust      1s 0.3s ease-out infinite; }
                .tl-exhaust-3    { animation: tl-exhaust      1s 0.6s ease-out infinite; }
                .tl-plane        { animation: tl-plane-glide  3s cubic-bezier(0.4,0,0.2,1) infinite; }
                .tl-cloud-slow   { animation: tl-cloud-drift  6s linear infinite; }
                .tl-cloud-fast   { animation: tl-cloud-drift  9s 3s linear infinite; }
                .tl-train-chug   { animation: tl-train-chug   0.2s ease-in-out infinite; }
                .tl-track-scroll { animation: tl-track-scroll 0.5s linear infinite; }
                .tl-smoke-1      { animation: tl-smoke-rise   1.2s ease-out infinite; }
                .tl-smoke-2      { animation: tl-smoke-rise   1.2s 0.4s ease-out infinite; }
                .tl-smoke-3      { animation: tl-smoke-rise   1.2s 0.8s ease-out infinite; }
                .tl-dot          { animation: tl-dot-blink    1.4s ease-in-out infinite; }
                .tl-dot-2        { animation: tl-dot-blink    1.4s 0.2s ease-in-out infinite; }
                .tl-dot-3        { animation: tl-dot-blink    1.4s 0.4s ease-in-out infinite; }
                .tl-label        { animation: tl-label-pulse  2s ease infinite; }
            `}</style>

            {/* Tab switcher */}
            <div className="flex mb-5 overflow-hidden border border-gray-200 dark:border-white/10 rounded-lg">
                {MODES.map((m) => (
                    <button
                        key={m}
                        onClick={() => setActive(m)}
                        className={[
                            'px-5 py-1.5 text-[13px] capitalize transition-colors',
                            active === m
                                ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-medium'
                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5',
                        ].join(' ')}
                    >
                        {m}
                    </button>
                ))}
            </div>

            {/* Scenes */}
            <div className="w-[340px] h-[120px] relative overflow-hidden">
                {active === 'truck' && <TruckScene />}
                {active === 'plane' && <PlaneScene />}
                {active === 'train' && <TrainScene />}
            </div>

            {/* Status */}
            <div className="mt-4 flex items-center gap-2 tl-label">
                <span className="text-[11px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">
                    {message ?? STATUS_LABELS[active]}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 tl-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 tl-dot-2" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 tl-dot-3" />
            </div>
        </div>
    );
}

function TruckScene() {
    return (
        <svg key="truck" width="340" height="120" viewBox="0 0 340 120" className="tl-scene" overflow="hidden">
            <defs><clipPath id="tl-clip-truck"><rect width="340" height="120" /></clipPath></defs>
            <g clipPath="url(#tl-clip-truck)">
                <line x1="0" y1="90" x2="340" y2="90" stroke="#d1d5db" strokeWidth="1" />
                <line x1="0" y1="95" x2="340" y2="95" stroke="#e5e7eb" strokeWidth="0.5"
                    strokeDasharray="20 20" className="tl-dash-scroll" />
                <g className="tl-truck-bob">
                    <rect x="150" y="52" width="110" height="38" rx="3" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="0.5" />
                    <rect x="110" y="60" width="50" height="30" rx="3" fill="#378ADD" stroke="#d1d5db" strokeWidth="0.5" />
                    <rect x="118" y="64" width="32" height="18" rx="2" fill="#B5D4F4" />
                    {/* wheels */}
                    <circle cx="135" cy="90" r="9" fill="#f9fafb" stroke="#9ca3af" strokeWidth="1.5" />
                    <circle cx="135" cy="90" r="5" fill="#9ca3af" style={{ transformOrigin: '135px 90px' }} className="tl-wheel" />
                    <circle cx="225" cy="90" r="9" fill="#f9fafb" stroke="#9ca3af" strokeWidth="1.5" />
                    <circle cx="225" cy="90" r="5" fill="#9ca3af" style={{ transformOrigin: '225px 90px' }} className="tl-wheel" />
                    <circle cx="248" cy="90" r="9" fill="#f9fafb" stroke="#9ca3af" strokeWidth="1.5" />
                    <circle cx="248" cy="90" r="5" fill="#9ca3af" style={{ transformOrigin: '248px 90px' }} className="tl-wheel" />
                </g>
                {/* exhaust */}
                <circle cx="98" cy="73" r="7" fill="#f3f4f6" className="tl-exhaust-1" />
                <circle cx="90" cy="70" r="5" fill="#f3f4f6" className="tl-exhaust-2" />
                <circle cx="82" cy="68" r="4" fill="#f3f4f6" className="tl-exhaust-3" />
                {/* road lines */}
                <g className="tl-road-scroll">
                    {[0, 80, 160, 240, 320].map((x) => (
                        <rect key={x} x={x} y="90" width="40" height="4" rx="1" fill="#e5e7eb" opacity="0.6" />
                    ))}
                </g>
            </g>
        </svg>
    );
}

function PlaneScene() {
    return (
        <svg key="plane" width="340" height="120" viewBox="0 0 340 120" className="tl-scene" overflow="hidden">
            <defs><clipPath id="tl-clip-plane"><rect width="340" height="120" /></clipPath></defs>
            <g clipPath="url(#tl-clip-plane)">
                <g className="tl-cloud-slow">
                    <ellipse cx="320" cy="38" rx="28" ry="12" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="0.5" />
                    <ellipse cx="340" cy="34" rx="18" ry="9"  fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="0.5" />
                    <ellipse cx="500" cy="55" rx="22" ry="10" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="0.5" />
                    <ellipse cx="520" cy="51" rx="15" ry="8"  fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="0.5" />
                </g>
                <g className="tl-cloud-fast">
                    <ellipse cx="480" cy="28" rx="20" ry="9" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="0.5" />
                </g>
                <g className="tl-plane" style={{ transformOrigin: '120px 60px' }}>
                    <g transform="translate(80,55)">
                        <ellipse cx="18" cy="5" rx="22" ry="7" fill="#378ADD" stroke="#185FA5" strokeWidth="0.5" />
                        <polygon points="38,5 50,5 42,1" fill="#378ADD" stroke="#185FA5" strokeWidth="0.5" />
                        <polygon points="8,12 22,12 18,5" fill="#185FA5" />
                        <polygon points="14,0 22,0 18,5" fill="#185FA5" />
                        <circle cx="10" cy="5" r="3" fill="#B5D4F4" />
                        <rect x="36" y="3" width="8" height="4" rx="1" fill="#185FA5" />
                    </g>
                </g>
                <line x1="0" y1="95" x2="340" y2="95" stroke="#e5e7eb" strokeWidth="0.5"
                    strokeDasharray="6 10" className="tl-dash-scroll" />
            </g>
        </svg>
    );
}

function TrainScene() {
    return (
        <svg key="train" width="340" height="120" viewBox="0 0 340 120" className="tl-scene" overflow="hidden">
            <defs><clipPath id="tl-clip-train"><rect width="340" height="120" /></clipPath></defs>
            <g clipPath="url(#tl-clip-train)">
                <line x1="0" y1="90" x2="340" y2="90" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="0" y1="97" x2="340" y2="97" stroke="#9ca3af" strokeWidth="1.5" />
                <line x1="0" y1="93" x2="340" y2="93" stroke="#d1d5db" strokeWidth="0.5"
                    strokeDasharray="15 15" className="tl-track-scroll" />
                <g className="tl-train-chug">
                    <rect x="100" y="55" width="145" height="35" rx="5" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="0.5" />
                    <rect x="98"  y="60" width="30"  height="30" rx="4" fill="#1D9E75" stroke="#d1d5db" strokeWidth="0.5" />
                    <rect x="104" y="63" width="18"  height="14" rx="2" fill="#9FE1CB" />
                    {[134, 160, 186, 212].map((x) => (
                        <rect key={x} x={x} y="62" width="20" height="12" rx="2" fill="#B5D4F4" stroke="#d1d5db" strokeWidth="0.5" />
                    ))}
                    {/* wheels */}
                    {[120, 148, 200, 228].map((cx) => (
                        <g key={cx}>
                            <circle cx={cx} cy="90" r="8" fill="#f9fafb" stroke="#9ca3af" strokeWidth="1.5" />
                            <circle cx={cx} cy="90" r="4" fill="#9ca3af"
                                style={{ transformOrigin: `${cx}px 90px` }} className="tl-wheel-fast" />
                        </g>
                    ))}
                    {/* chimney + smoke */}
                    <rect x="99" y="55" width="6" height="10" rx="2" fill="#0F6E56" />
                    <circle cx="102" cy="54" r="4" fill="#f3f4f6" stroke="#0F6E56" strokeWidth="0.5" className="tl-smoke-1" />
                    <circle cx="100" cy="48" r="3" fill="#f3f4f6" stroke="#0F6E56" strokeWidth="0.5" className="tl-smoke-2" />
                    <circle cx="103" cy="42" r="2.5" fill="#f3f4f6" stroke="#0F6E56" strokeWidth="0.5" className="tl-smoke-3" />
                </g>
            </g>
        </svg>
    );
}