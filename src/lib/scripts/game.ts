import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { get } from 'svelte/store';
import { goto } from '$app/navigation';

export const cookies = writable<number>(3);
export const startTime = writable<number | null>(null);
export const recordTime = writable<number>(0);
export const showInfoSlide = writable<boolean>(false);
export const infoTitle = writable<string>('');
export const infoText = writable<string>('');

/* ---------- Cookies ---------- */

export function resetCookies() {
    cookies.set(3);
    if (browser) {
        localStorage.setItem('cookie_score', '3');
    }
}

export function storeCookies(value: number) {
    cookies.set(value);
    if (browser) localStorage.setItem('cookie_score', String(value));
}

export function loadCookies() {
    if (!browser) return;

    const raw = localStorage.getItem('cookie_score');
    if (raw === null) return;          // ← bail out if there was no value
    const stored = Number(raw);
    if (!isNaN(stored)) {
        cookies.set(stored);
    }
}

export function loseCookie() {
    const next = Math.max(0, get(cookies) - 1);
    cookies.set(next);
    localStorage.setItem('cookie_score', String(next));
}

export function loseCookieAndGoTo(path: string) {
    if (!browser) return;

    const animation = document.createElement('div');
    animation.id = 'animation';
    document.body.appendChild(animation);

    const cookieImg = document.createElement('img');
    cookieImg.id = 'animation_cookie';
    cookieImg.src = '/images/cookie.png';
    animation.appendChild(cookieImg);

    setTimeout(() => {
        loseCookie();
        storeCookies(get(cookies));
        document.body.removeChild(animation);
        if (get(cookies) === 0) {
            goto('/game-lost');
            return;
        }
        goto(path);
        showInfoSlide.set(true);
    }, 1300);
}

/* ---------- Timer and HighscoreTime ---------- */

export function startTimer() {
    const now = Date.now();
    startTime.set(now);
    if (browser) {
        localStorage.setItem('start_time', String(now));
    }
}
export function getGameTime() {
    if (!browser) return 0;
    const start = Number(localStorage.getItem('start_time'));
    setRecord(Date.now() - start);
    return msToTime(Date.now() - start);
}

export function msToTime(ms: number): string {
    let secs = ms / 1000;
    ms = Math.floor(ms % 1000);
    let minutes = secs / 60;
    secs = Math.floor(secs % 60);
    minutes = Math.floor(minutes % 60);
    return `${minutes}:${secs}.${ms}`;
}


/* ---------- Record ---------- */

export function setRecord(newTime: number) {
    if (!browser) return;

    const record = Number(localStorage.getItem('record_time'));

    if (!record || newTime <= record) {
        localStorage.setItem('record_time', String(newTime));
        recordTime.set(newTime);
    } else {
        recordTime.set(record);
    }
}
