@echo off
call npm install
call npm install framer-motion axios lucide-react clsx tailwind-merge react-hook-form
call npm install -D tailwindcss postcss autoprefixer
call npx tailwindcss init -p
