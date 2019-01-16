import faker from 'faker';

export const randomCards = (count = 10) => {
  const arr = [];
  for (let i = 0; i < count; i ++) {
    arr.push({
      key: faker.random.uuid(),
      image: faker.image.image(),
      title: faker.lorem.words(5),
      caption: faker.lorem.words(3),
      words: faker.lorem.paragraphs(200)
    });
    // console.log(arr[i]);
  }
  return arr;
};