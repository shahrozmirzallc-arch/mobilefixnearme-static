# 🚀 GitHub + Netlify Auto-Deploy Setup Guide

## ⚡ SUPER EASY SETUP (5 Minutes)

### **STEP 1: Create GitHub Repository**

1. **Go to GitHub:**
   - https://github.com/new
   - Login if needed

2. **Create New Repository:**
   - **Repository name:** `mobilefixnearme-website`
   - **Description:** "Mobile Fix Near Me - Repair Services Website"
   - **Visibility:** ✅ Public (or Private - your choice)
   - **DON'T** check "Add README" or any files
   - Click **"Create repository"**

---

### **STEP 2: Push Code to GitHub**

1. **Open Command Prompt/Terminal:**
   - Press `Win + R`
   - Type: `cmd`
   - Press Enter

2. **Navigate to project folder:**
   ```bash
   cd C:\Users\Sharoz\mobilefixnearme-website
   ```

3. **Initialize Git (if not already):**
   ```bash
   git init
   ```

4. **Add all files:**
   ```bash
   git add .
   ```

5. **Commit files:**
   ```bash
   git commit -m "Initial commit - Complete website with blogs"
   ```

6. **Add remote (GitHub will show you this command):**
   ```bash
   git remote add origin https://github.com/mobilefixnearme-static/mobilefixnearme-website.git
   ```

7. **Push to GitHub:**
   ```bash
   git branch -M main
   git push -u origin main
   ```

   **If it asks for login:**
   - Username: `mobilefixnearme-static`
   - Password: Use **Personal Access Token** (not password)
   
   **Don't have token? Generate here:**
   - https://github.com/settings/tokens/new
   - Check: `repo` (full control)
   - Click "Generate token"
   - Copy and use as password

---

### **STEP 3: Connect Netlify to GitHub** ⭐

1. **Go to Netlify:**
   - https://app.netlify.com
   - Login

2. **Go to your site:**
   - Click on **"mobilefixnearme"** site
   - Go to **"Site settings"**

3. **Connect to Git:**
   - Click **"Build & deploy"** in left sidebar
   - Click **"Link repository"** or **"Connect to Git provider"**
   - Choose **GitHub**
   - Authorize Netlify (if asked)

4. **Select Repository:**
   - Find: `mobilefixnearme-static/mobilefixnearme-website`
   - Click to select

5. **Build Settings:**
   - **Branch to deploy:** `main`
   - **Build command:** (leave empty)
   - **Publish directory:** `/` (root)
   - Click **"Deploy site"**

---

### **STEP 4: Test Auto-Deploy** ✅

**First deploy will happen automatically!**

Wait 30-60 seconds, then:
- Check: www.mobilefixnearme.ca
- Should show updated website! 🎉

---

## 🎯 **HOW IT WORKS FROM NOW ON:**

### **When Mercury (me) updates website:**

1. ✅ I make changes to files
2. ✅ I push to GitHub: `git push origin main`
3. ✅ Netlify detects change automatically
4. ✅ **Auto-deploys in 30 seconds!**
5. ✅ Website LIVE with updates!

### **You will see:**
```
Shahroz: "Add a new blog about screen protectors"
Mercury: *creates blog* *pushes to GitHub*
Mercury: "✅ Deployed! Live in 30 seconds at www.mobilefixnearme.ca"
```

---

## 🆘 **TROUBLESHOOTING:**

### **Problem: Git asks for password**
**Solution:** Use Personal Access Token
- Generate: https://github.com/settings/tokens/new
- Scope: `repo`
- Use token as password

### **Problem: Git not installed**
**Solution:** Download Git
- https://git-scm.com/download/win
- Install with default settings
- Restart Command Prompt

### **Problem: Can't push to GitHub**
**Solution:** Check remote URL
```bash
git remote -v
```
Should show your GitHub repo URL.

### **Problem: Netlify not auto-deploying**
**Solution:** 
1. Check Netlify → Site settings → Build & deploy
2. Make sure "Auto publishing" is ON
3. Check if branch name is correct (`main`)

---

## ✅ **VERIFICATION:**

After setup, verify:
- ✅ Code visible on GitHub
- ✅ Netlify connected to repo
- ✅ Auto-deploy enabled
- ✅ Website updated at www.mobilefixnearme.ca

---

## 📞 **NEED HELP?**

Tell Mercury:
- "Check if it's connected"
- "Push update to test"
- "Something's not working"

---

**Once setup is done, ALL FUTURE UPDATES = AUTOMATIC!** 🚀✨
