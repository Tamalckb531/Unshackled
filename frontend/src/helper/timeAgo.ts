const timeAgo = (date: string) => {
    const t1 = new Date();
    const t2 = new Date(date);
    const seconds = Math.floor((t1.getTime() - t2.getTime()) / 1000);

    if (seconds < 5) return 'Just now';
    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds === 60) return 'a minute ago';

    const minutes = Math.floor(seconds / 60);
    if (minutes === 30) return 'half an hour ago';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (minutes === 60) return 'an hour ago';

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (hours === 24) return 'a day ago';

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (days === 7) return 'a week ago';

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    if (weeks === 4) return 'a month ago';

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (months === 12) return 'an year ago';

    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
}

export default timeAgo;