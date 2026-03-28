
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { pt } from "@/translations/pt";
import { en } from "@/translations/en";
import { Translation } from "@/translations/types";

type Language = "pt" | "en";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("pt");

    // Load saved language from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("language") as Language;
        if (saved && (saved === "pt" || saved === "en")) {
            setLanguage(saved);
        }
    }, []);

    // Save changes
    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const t = language === "pt" ? pt : en;

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
