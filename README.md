# Travel Studio

## Installation

### Steps to Install

1. Clone the repository:

   ```bash
   git clone https://github.com/iamatifmoin/Travel-Studio.git
   cd Travel-Studio
   ```

2. Install the dependencies:
   Using npm:
   ```bash
   npm install
   ```
   Or using Yarn:
   ```bash
   yarn install
   ```

### Running the Development Server

To run the application locally:

1. Run the development server:

   ```bash
   npm run dev
   ```

   Or with Yarn:

   ```bash
   yarn dev
   ```

2. Visit `http://localhost:8080` in your browser to access the application.

## Deployed Link

[Travel-Studio (Vercel)](https://travel-studio.vercel.app/)

## Design Choices

I've kept the design really simple. I wanted to deliver the features first. I can surely work on improving the design once the functionalities are implemented in the right manner.

## Challenges Faced

When a User click on an amenity in the 3D map, the card for the amenity pops up showing the detailed description. Now, the reverse of this should also be true i.e. when the User clicks on an amenity card, it should be highlighted on the 3D map.

This is something that I had difficulty in implementing. I used some ChatGPT prompts as well as Lovable AI to review my code and help with implementing this feature.

The feature is now implemented.
