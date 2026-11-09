export interface QuotePortrait {
  text: string;
  author: string;
  imageKey: string;
  lift?: number;
  by: string;
  license: string;
  sourceUrl: string;
}

const CC = 'https://commons.wikimedia.org/wiki/File:';

export const quotePortraits: QuotePortrait[] = [
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
    imageKey: "jobs",
    by: "Matthew Yohe",
    license: "CC BY-SA 3.0",
    sourceUrl: CC + "Steve_Jobs_Headshot_2010-CROP_(cropped_2).jpg"
  },
  {
    text: "Good design is as little design as possible.",
    author: "Dieter Rams",
    imageKey: "rams",
    by: "Vitsœ",
    license: "CC BY-SA 3.0",
    sourceUrl: CC + "Designer-Dieter_Rams.jpg"
  },
  {
    text: "The details are not the details. They make the design.",
    author: "Charles Eames",
    imageKey: "eames",
    by: "Herbert Matter",
    license: "Public domain",
    sourceUrl: CC + "Charles_Eames_in_Arts_%26_Architecture,_January_1945_(page_41_crop).jpg"
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck",
    imageKey: "beck",
    lift: 20,
    by: "Improve It",
    license: "CC BY-SA 2.0",
    sourceUrl: CC + "Kent_Beck_no_Workshop_Mapping_XP.jpg"
  },
  {
    text: "Simple things should be simple, complex things should be possible.",
    author: "Alan Kay",
    imageKey: "kay",
    by: "Marcin Wichary",
    license: "CC BY 2.0",
    sourceUrl: CC + "Alan_Kay_(3097597186)_(cropped).jpg"
  }
];

