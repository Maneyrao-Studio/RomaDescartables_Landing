export class ApiClient {
  private baseUrl: string = process.env.NEXT_PUBLIC_API_URL!
  
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`)
    if (!response.ok) throw new Error(`API Error: ${response.status}`)
    return response.json()
  }
}