import bcrypt from 'bcryptjs';

export const getDate = (givenDate = new Date()): string => {
    const offset = givenDate.getTimezoneOffset();
    givenDate = new Date(givenDate.getTime() - offset * 60 * 1000);
    return givenDate.toISOString().split('T')[0];
}

export function hourMinute(date: Date) {
    const hour = date.getHours()
    const minute = date.getMinutes()

    return hour < 13 ? `${hour}:${minute} AM` : `${hour-12}:${minute} PM`
}

export function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en', {
        dateStyle: 'long'
    }).format(date)
}

export function slugify(text: string) {
    return text
      .replace(/\s/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
      .toLowerCase()
}

export function hashPassword(pass: string) {
    return bcrypt.hash(pass, 0)
}