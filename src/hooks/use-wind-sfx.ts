"use client";



export const useWindSfx = () => {
    // SFX Disabled by user request
    const updateWindSpeed = (speed: number) => { };
    const triggerSwitch = () => { };

    return { updateWindSpeed, triggerSwitch };
};
