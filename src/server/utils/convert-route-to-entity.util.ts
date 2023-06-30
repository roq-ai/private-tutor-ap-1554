const mapping: Record<string, string> = {
  bookings: 'booking',
  startups: 'startup',
  tutors: 'tutor',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
