"use client";

import { useState } from "react";

interface AvatarProps {
    user?: { name?: string | null; image?: string | null; avatar?: string | null } | null;
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
    className?: string;
}

const sizeMap = {
    sm: "avatar-sm",
    md: "avatar-md",
    lg: "avatar-lg",
    xl: "avatar-xl",
    "2xl": "avatar-2xl",
};

export function Avatar({ user, size = "md", className = "" }: AvatarProps) {
    const [failedSrc, setFailedSrc] = useState<string | null>(null);
    const sizeClass = sizeMap[size];
    
    const rawSrc = (user as any)?.avatar || user?.image;
    const src = (rawSrc && typeof rawSrc === "string" && rawSrc !== "null" && rawSrc !== "undefined" && rawSrc.trim().length > 0)
        ? rawSrc.trim()
        : null;

    const letter = (user?.name || "?")[0]?.toUpperCase() || "?";

    const isGold = (user as any)?.verificationType === "GOLD";
    const shapeClass = isGold ? "avatar-square" : "";

    const hasError = src ? failedSrc === src : true;

    if (src && !hasError) {
        return (
            <img
                key={src}
                src={src}
                alt={user?.name || "Avatar"}
                className={`avatar ${sizeClass} ${shapeClass} ${className}`}
                onError={() => setFailedSrc(src)}
            />
        );
    }

    return (
        <div className={`avatar-placeholder ${sizeClass} ${shapeClass} ${className}`}>
            {letter}
        </div>
    );
}
