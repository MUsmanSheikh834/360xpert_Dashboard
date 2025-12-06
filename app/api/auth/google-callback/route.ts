import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

/**
 * API Route: /api/auth/google-callback
 *
 * Handles Google OAuth authorization code exchange.
 * This route receives the authorization code from the client,
 * exchanges it for an access token using the client secret,
 * and then authenticates with the backend.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: "Authorization code is required" }, { status: 400 });
    }

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/google-callback`;

    if (!clientId || !clientSecret) {
      console.error("Missing Google OAuth credentials");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Exchange authorization code for access token
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return NextResponse.json({ error: "Failed to obtain access token" }, { status: 500 });
    }

    // Authenticate with your backend using the access token
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const authResponse = await axios.post(
      `${backendUrl}/auth/google`,
      { idToken: access_token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { token, user } = authResponse.data;

    return NextResponse.json({ token, user }, { status: 200 });
  } catch (error: any) {
    console.error("Google OAuth callback error:", error.response?.data || error.message);

    return NextResponse.json(
      {
        error: error.response?.data?.message || "Authentication failed",
        details: error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
