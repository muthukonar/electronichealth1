export interface Notes {
    TopicID?: number;
    Title?: string;
    Description?: string;
    ContentURL?: string;
}
export async function fetchNotes(): Promise<Notes[]> {
    try {
      const response = await fetch('https://yourapi.com/api/patients');
      if (!response.ok) {
        throw new Error(`Error fetching notes: ${response.statusText}`);
      }
      const data: Notes[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error in fetchNotes:', error);
      throw error; // Rethrow for higher-level handling
    }
  }
  
  // 3. Example utility function for transforming the data (Optional)
  export function formatNotes(note: Notes): string {
    return `${note.Title}: ${note.Description}`;
  }

