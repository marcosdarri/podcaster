interface PodcastGeneralInfo {
  id: number;
  img: string;
  name: string;
  author: string;
  title: string;
  summary: string;
}

interface Podcast {
  id: number;
  img: string;
  name: string;
  url: string;
  author: string;
}

interface Episode {
  id: number;
  title: string;
  date: string;
  duration: number;
  content: string;
  url: string;
}

export { PodcastGeneralInfo, Podcast, Episode };
