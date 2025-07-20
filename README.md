# Bookverse: A Modern Platform for Book Lovers

Bookverse is a feature-rich, web-based application designed to offer an immersive and interactive book reading experience. Inspired by modern content platforms, it provides a familiar and intuitive interface for discovering, reading, and engaging with a diverse collection of books.

## ✨ Features

### Current Features

- **Modern, Responsive UI**: Built with Next.js, TypeScript, and Tailwind CSS for a fast, scalable, and mobile-friendly experience.
- **Interactive Book Discovery**: Browse trending books on the homepage with a clean, grid-based layout.
- **YouTube-Style Reading Page**:
  - **Book Reader**: An integrated component to read books directly within the app.
  - **Engagement Metrics**: Like and dislike books, with real-time updates to the UI.
  - **Channel/Author System**: Subscribe to your favorite authors or publishers.
  - **Social Interaction**: Share books with others and download them for offline access.
  - **Detailed Metadata**: View book statistics, including views, upload dates, and categories.
- **Community Engagement**: A dedicated section for comments and discussions on each book.
- **Seamless Navigation**:
  - **"Up Next" Sidebar**: Discover new books related to what you're currently reading.
  - **Collapsible Sidebar**: A responsive and persistent navigation sidebar for easy access to different parts of the application.
- **Rich Component Library**: Utilizes **shadcn/ui** and **Radix UI** for a wide range of accessible and high-quality UI components.

### Future Roadmap

- **User Authentication**: Allow users to create accounts, save their reading progress, and manage subscriptions.
- **Dynamic Backend**: Replace the current static data with a full-fledged backend and database to manage books, users, and comments dynamically.
- **PDF & ePub Support**: Enhance the `BookReader` to support popular formats like PDF and ePub.
- **Advanced Search & Filtering**: Implement a robust search functionality with filters for genre, author, and ratings.
- **User Profiles**: Create dedicated profile pages for users to showcase their reading history and favorite books.
- **Notifications**: Notify users about new book uploads from their subscribed channels.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 13 (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/)
- **State Management**: React Hooks
- **Icons**: [Lucide React](https://lucide.dev/)
- **Class Merging**: `tailwind-merge`, `clsx`

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Satishacharya31/bookverse.git
    cd bookverse
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates a production-ready build.
- `npm run start`: Starts the production server.
- `npm run lint`: Lints the codebase for errors.

## 📂 Project Structure

The project follows the standard Next.js App Router structure:

```
.
├── app/                  # Main application routes and pages
│   ├── book/[slug]/      # Dynamic route for book details
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/           # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── book-card.tsx     # Card for displaying a single book
│   ├── book-reader.tsx   # Component for reading book content
│   └── navbar.tsx        # Top navigation bar
├── lib/                  # Utility functions and data
│   ├── data.ts           # Static data for the application
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
