export const shuffleArray = (array: any[]) => 
    [...array].sort(() => Math.random() - 0.5); // array spreading (don't really understand this)