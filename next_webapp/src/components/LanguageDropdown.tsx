"use client";
import { usePathname, useRouter } from "@/i18n-navigation";
import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

const languages = [
  { name: "English", locale: "en" },
  { name: "Chinese (中文)", locale: "cn" },
  { name: "Spanish (Español)", locale: "es" },
  { name: "Greek (Ελληνικά)", locale: "el" },
  { name: "Arabic (العربية)", locale: "ar" },
  { name: "Italian (Italiano)", locale: "it" },
  { name: "Hindi (हिन्दी)", locale: "hi" },
  { name: "Vietnamese (Tiếng Việt)", locale: "vi" },
] as const;

const LanguageDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectLanguage = (locale: string) => {
    setIsOpen(false);
    router.push(pathname, { locale });
    router.refresh();
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="mr-2 inline-flex h-10 min-w-[96px] items-center justify-center rounded-lg border border-green-600 bg-white px-4 text-sm font-medium text-green-600 transition-all duration-200 transform hover:scale-105 hover:bg-green-50 hover:text-green-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:border-green-400 dark:bg-black dark:text-green-300 dark:hover:bg-gray-800"
      >
        {t("Language")}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {languages.map((lang) => (
            <button
              key={lang.locale}
              onClick={() => selectLanguage(lang.locale)}
              className="block w-full px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-green-300"
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;