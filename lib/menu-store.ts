"use client";

type Listener = () => void;

let isOpen = false;
let openSubmenu: string | null = null;
const listeners = new Set<Listener>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export const menuStore = {
  getIsOpen: () => isOpen,
  getOpenSubmenu: () => openSubmenu,

  open: () => {
    isOpen = true;
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
    emitChange();
  },

  close: () => {
    isOpen = false;
    openSubmenu = null;
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
    emitChange();
  },

  setSubmenu: (key: string | null) => {
    openSubmenu = key;
    emitChange();
  },

  toggleSubmenu: (key: string) => {
    openSubmenu = openSubmenu === key ? null : key;
    emitChange();
  },

  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
