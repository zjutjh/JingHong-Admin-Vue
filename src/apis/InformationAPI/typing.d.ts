declare namespace InformationAPI {
  interface Information {
    id: number;
    title: string;
    content: string;
    publish_time: string | null;
    publisher: string | null;
    img1: null | string;
    img2: null | string;
    img3: null | string;
  }
}