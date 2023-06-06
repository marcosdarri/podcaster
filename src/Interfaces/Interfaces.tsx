interface Podcast {
  id: number;
  img: string;
  name: string;
  author: string;
  title: string;
  summary: string;
}

interface Episode {
  id: number;
  title: string;
  date: string;
  duration: number;
  content: string;
  trackId: string;
}

export { Podcast, Episode };
