import slugify from 'slugify';

export default function (topicName: string) {
  return slugify(topicName, {
    replacement: '-',
    remove: undefined,
    lower: false,
    strict: false,
    locale: 'vi',
    trim: true,
  });
}
