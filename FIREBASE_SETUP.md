# Firebase Setup Instructions

## 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `stylelink`
4. Enable Google Analytics (optional)

## 2. Enable Authentication
1. Go to Authentication > Sign-in method
2. Enable Email/Password
3. Enable Google sign-in
4. Add authorized domains:
   - `localhost` (for development)
   - `http://localhost:3000`
   - Your production domain

## 3. Create Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Start in test mode (for development)
4. Choose location closest to your users

## 4. Setup Storage
1. Go to Storage
2. Click "Get started"
3. Start in test mode (for development)
4. Note your storage bucket name

## 5. Get Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon to add web app
4. Register app with name "StyleLink"
5. Copy the configuration object

## 6. Update Firebase Config
Replace the config in `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 7. Firestore Security Rules
Update Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 8. Storage Security Rules
Update Storage rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

## 8.1. Fix CORS Issue (Alternative)
If you get CORS errors, use Firebase Admin SDK or change Storage rules to:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Or install Google Cloud SDK and run:
```bash
gsutil cors set cors.json gs://stylelink-9e5a1.firebasestorage.app
```

## 9. Admin Setup
Create an admin user manually in Firebase Console:

### Step 1: Create Authentication User
1. Go to Authentication > Users
2. Click "Add user"
3. Enter:
   - **Email**: `admin@stylelink.com`
   - **Password**: `admin123`
4. Click "Add user"
5. Copy the generated UID

### Step 2: Create Firestore Document
1. Go to Firestore Database
2. Click "Start collection" and name it `users`
3. Create document with the copied UID as document ID
4. Add these fields:
```json
{
  "uid": "[paste-the-uid-here]",
  "email": "admin@stylelink.com",
  "name": "Admin User",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Admin Login Credentials:
- **Email**: `admin@stylelink.com`
- **Password**: `admin123`