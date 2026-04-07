# Vercel Deployment Guide for QuickPick

## Step-by-Step Deployment Instructions

### Prerequisites
1. **GitHub Account**: Push your project to GitHub (Vercel requires this)
2. **Vercel Account**: Sign up at https://vercel.com
3. **Environment Variables Ready**: Have your API keys and credentials ready

### Step 1: Prepare Your GitHub Repository

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub and push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/QuickPick.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Update Your Client Configuration

The client needs to know the API endpoint. Update your API calls to use a dynamic base URL:

1. Create a file `client/src/config/api.js`:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
   export default API_BASE_URL;
   ```

2. Create `client/.env.production`:
   ```
   VITE_API_URL=https://your-domain.vercel.app/api
   ```

3. Update any API calls in your components to use this config instead of hardcoded URLs.

### Step 3: Deploy on Vercel

1. **Go to Vercel**: https://vercel.com/new

2. **Import Project**:
   - Click "Import Project"
   - Select "Import Git Repository"
   - Paste your GitHub repo URL
   - Click Continue

3. **Configure Project**:
   - **Framework**: Leave as auto-detected
   - **Root Directory**: Leave empty (default)
   - **Build Command**: Should be auto-filled based on vercel.json
   - **Output Directory**: Should show "client/dist"

4. **Add Environment Variables**:
   - After clicking "Deploy", you'll need to add environment variables
   - Click "Settings" → "Environment Variables"
   - Add the following variables (get values from your services):
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Any random string for JWT signing
     - `CLOUDINARY_NAME`: Your Cloudinary account name
     - `CLOUDINARY_API_KEY`: Your Cloudinary API key
     - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
     - `STRIPE_SECRET_KEY`: Your Stripe secret key
     - `STRIPE_PUBLIC_KEY`: Your Stripe public key
     - `CLIENT_URLS`: Your Vercel deployment URL (https://xxx.vercel.app)

5. **Redeploy After Setting Environment Variables**:
   - Go back to "Deployments"
   - Click the three dots on the latest deployment
   - Select "Redeploy"

### Step 4: Setup Your Services

#### MongoDB Atlas
1. Create a cluster at https://www.mongodb.com/cloud/atlas
2. Get your connection string
3. Add it to `MONGODB_URI`

#### Cloudinary
1. Create account at https://cloudinary.com
2. Get your credentials from the dashboard
3. Add to environment variables

#### Stripe
1. Create account at https://stripe.com
2. Get your API keys from the dashboard
3. Add to environment variables

### Step 5: Test Your Deployment

Once deployed:
1. Visit your Vercel URL: https://xxx.vercel.app
2. Test all features (login, product browsing, cart, chat, etc.)
3. Check the Vercel logs if anything breaks:
   - Go to your project on Vercel
   - Click "Deployments"
   - Click on your deployment
   - View "Logs"

### Step 6: Update Your Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain if you have one
3. Follow DNS configuration instructions

## Troubleshooting

**Cold Starts**: Serverless functions take longer on first call. This is normal.

**CORS Issues**: Make sure `CLIENT_URLS` environment variable matches your deployed URL.

**Database Connection Errors**: 
- Verify `MONGODB_URI` is correct
- Check if Vercel's IP is whitelisted in MongoDB

**API Routes Not Found**:
- Check that `/api` routes are working: visit `https://your-domain.vercel.app/api`
- It should return "API is Working"

**Environment Variables Not Loading**:
- Redeploy after adding environment variables
- Vercel doesn't use existing deployments when you add new env vars

## Important Notes

- The deployment uses serverless functions for the API
- Cold starts may take 5-10 seconds on first request
- Client-side code is built and served as static files
- Database connections may need connection pooling optimization
- Environment variables are not visible in client-side code unless prefixed with `VITE_` in the client folder

---

For more help: https://vercel.com/docs
