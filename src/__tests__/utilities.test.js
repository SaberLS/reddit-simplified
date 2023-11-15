import { generateRandomString } from "../utilities/authorization_utilities";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

describe("generate random string", function () {
  it("generates string of given length", () => {
    const firstLength = getRandomInt(20);
    const firstString = generateRandomString(firstLength);

    const diffrentLength = getRandomInt(20);
    const diffrentString = generateRandomString(diffrentLength);

    expect(firstString).toHaveLength(firstLength);
    expect(diffrentString).toHaveLength(diffrentLength);
  });

  it("generates diffrent random strings", function () {
    const firstString = generateRandomString(10);
    const diffrentString = generateRandomString(10);

    expect(firstString).not.toBe(diffrentString);
  });
});


