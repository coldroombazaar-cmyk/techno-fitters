# 🚀 Upload TechnoFitters to GitHub

## Quick Steps

### 1. Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Fill in the details:
   - **Repository name:** `TechnoFitters` (or your preferred name)
   - **Description:** "Premium scrollytelling landing page for Modular Cold Room"
   - **Visibility:** Choose Public or Private
   - ⚠️ **DO NOT** check "Initialize with README" (we already have code)
4. Click **Create repository**

### 2. Connect Your Local Repository

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/TechnoFitters.git

# Rename branch from master to main (optional, recommended)
git branch -M main

# Push your code
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## Detailed Step-by-Step Guide

### Option A: Using HTTPS (Recommended for beginners)

```bash
# 1. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/TechnoFitters.git

# 2. Rename branch to main
git branch -M main

# 3. Push to GitHub
git push -u origin main
```

When prompted, enter your GitHub credentials:
- **Username:** Your GitHub username
- **Password:** Your GitHub Personal Access Token (not your password!)

> **Note:** GitHub no longer accepts passwords. You need a Personal Access Token.
> Create one at: https://github.com/settings/tokens

### Option B: Using SSH (If you have SSH keys set up)

```bash
# 1. Add remote (replace YOUR_USERNAME)
git remote add origin git@github.com:YOUR_USERNAME/TechnoFitters.git

# 2. Rename branch to main
git branch -M main

# 3. Push to GitHub
git push -u origin main
```

---

## If You Want to Keep "master" Branch

If you prefer to keep the `master` branch name:

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/TechnoFitters.git

# Push master branch
git push -u origin master
```

---

## Troubleshooting

### Error: "remote origin already exists"

```bash
# Remove existing remote
git remote remove origin

# Add it again
git remote add origin https://github.com/YOUR_USERNAME/TechnoFitters.git
```

### Error: "failed to push some refs"

This usually means the remote has commits you don't have locally.

```bash
# Pull first, then push
git pull origin main --rebase
git push -u origin main
```

### Authentication Failed

You need a Personal Access Token:

1. Go to https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Give it a name: "TechnoFitters Upload"
4. Select scopes: Check **repo** (full control)
5. Click **Generate token**
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

---

## What Will Be Uploaded

Your repository will include:

```
TechnoFitters/
├── src/                          # Source code
│   ├── app/                      # Next.js app
│   ├── components/               # React components
│   ├── lib/                      # Utilities
│   └── types/                    # TypeScript types
├── public/
│   └── multipleframe/            # Your 40 JPG images
├── Documentation files
│   ├── README.md
│   ├── QUICKSTART.md
│   ├── PROJECT_SUMMARY.md
│   ├── STORY_EXAMPLES.md
│   ├── DEPLOYMENT.md
│   └── IMPLEMENTATION_COMPLETE.md
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
└── .gitignore                    # Git ignore rules
```

**Note:** `node_modules` and `.next` are automatically excluded via `.gitignore`

---

## After Uploading

Once uploaded, you can:

1. **View your code:** `https://github.com/YOUR_USERNAME/TechnoFitters`
2. **Share the link** with others
3. **Deploy to Vercel:**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy
   vercel
   ```

---

## Quick Reference Commands

```bash
# Check current status
git status

# Check remote
git remote -v

# Check current branch
git branch

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push
```

---

## Need Help?

If you encounter any issues:

1. Check the error message carefully
2. Make sure you've created the GitHub repository first
3. Verify your GitHub username in the URL
4. Ensure you're using a Personal Access Token, not your password

---

**Ready to upload!** 🚀

Follow the steps above and your code will be on GitHub in minutes.
