export async function getHealthStatus() {
  return await fetch(`${process.env.BASE_URL}/health`);
}
