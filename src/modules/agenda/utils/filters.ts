export function getTimeRangeFilter(timeRange: string): { startDate: Date; endDate: Date } {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (timeRange) {
    case "day":
      return {
        startDate: startOfDay,
        endDate: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)
      };
    case "week":
      const startOfWeek = new Date(startOfDay);
      startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);
      return { startDate: startOfWeek, endDate: endOfWeek };
    case "month":
      return {
        startDate: new Date(now.getFullYear(), now.getMonth(), 1),
        endDate: new Date(now.getFullYear(), now.getMonth() + 1, 0)
      };
    case "year":
      return {
        startDate: new Date(now.getFullYear(), 0, 1),
        endDate: new Date(now.getFullYear() + 1, 0, 0)
      };
    default:
      return { startDate: startOfDay, endDate: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000) };
  }
}

export function filterEvents(events: any[], query: string) {
  if (!query) return events;
  
  const searchTerms = query.toLowerCase().split(" ");
  return events.filter(event => {
    const searchText = `${event.title} ${event.description || ""} ${event.location || ""}`.toLowerCase();
    return searchTerms.every(term => searchText.includes(term));
  });
}