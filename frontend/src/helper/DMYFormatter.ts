const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US",
        {
            month: "long",
            timeZone: "UTC"
        });
    const year = date.getUTCFullYear();

    return `${day} ${month}, ${year}`
}

export default formatDate;