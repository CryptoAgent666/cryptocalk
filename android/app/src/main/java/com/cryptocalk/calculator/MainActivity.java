package com.cryptocalk.calculator;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private View loadingOverlay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Window window = getWindow();
        window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        window.setStatusBarColor(Color.parseColor("#0f172a"));
        window.setNavigationBarColor(Color.parseColor("#0f172a"));
        WindowCompat.setDecorFitsSystemWindows(window, true);

        WindowInsetsControllerCompat controller =
            WindowCompat.getInsetsController(window, window.getDecorView());
        if (controller != null) {
            controller.setAppearanceLightStatusBars(false);
        }

        // Push content below status bar
        ViewCompat.setOnApplyWindowInsetsListener(window.getDecorView(), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            View contentView = findViewById(android.R.id.content);
            if (contentView != null) {
                contentView.setPadding(0, systemBars.top, 0, 0);
            }
            return WindowInsetsCompat.CONSUMED;
        });

        // Create loading overlay with logo
        createLoadingOverlay();

        // Configure WebView
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            WebSettings settings = webView.getSettings();
            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(true);
            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
            settings.setSupportMultipleWindows(false);
            settings.setJavaScriptCanOpenWindowsAutomatically(true);
            settings.setLoadWithOverviewMode(true);
            settings.setUseWideViewPort(true);
            settings.setUserAgentString(settings.getUserAgentString() + " CryptoCalkApp/1.3");

            android.webkit.CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true);

            // Open external links in system browser, keep internal navigation in WebView
            webView.setWebViewClient(new WebViewClient() {
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                    String host = request.getUrl().getHost();
                    if (host == null) return false;
                    // Keep local navigation and allowed API/CDN domains inside WebView
                    if (host.equals("localhost") || host.endsWith("cryptocalk.com")) {
                        return false; // Load inside WebView
                    }
                    // Open everything else in system browser
                    Intent intent = new Intent(Intent.ACTION_VIEW, request.getUrl());
                    startActivity(intent);
                    return true; // Prevent WebView from loading it
                }
            });

            // Hide loading overlay when page finishes loading
            webView.setWebChromeClient(new WebChromeClient() {
                @Override
                public void onProgressChanged(WebView view, int newProgress) {
                    if (newProgress >= 80 && loadingOverlay != null && loadingOverlay.getVisibility() == View.VISIBLE) {
                        loadingOverlay.animate()
                            .alpha(0f)
                            .setDuration(300)
                            .withEndAction(() -> {
                                loadingOverlay.setVisibility(View.GONE);
                            })
                            .start();
                    }
                }
            });
        }
    }

    private void createLoadingOverlay() {
        FrameLayout rootView = (FrameLayout) findViewById(android.R.id.content);
        if (rootView == null) return;

        // Container
        LinearLayout overlay = new LinearLayout(this);
        overlay.setOrientation(LinearLayout.VERTICAL);
        overlay.setGravity(Gravity.CENTER);
        overlay.setBackgroundColor(Color.parseColor("#0f172a"));
        overlay.setLayoutParams(new FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        ));

        // Logo text: "Crypto" in cyan + "Calk" in white
        LinearLayout logoRow = new LinearLayout(this);
        logoRow.setOrientation(LinearLayout.HORIZONTAL);
        logoRow.setGravity(Gravity.CENTER);

        TextView cryptoText = new TextView(this);
        cryptoText.setText("Crypto");
        cryptoText.setTextColor(Color.parseColor("#22d3ee"));
        cryptoText.setTextSize(TypedValue.COMPLEX_UNIT_SP, 32);
        cryptoText.setTypeface(Typeface.DEFAULT_BOLD);

        TextView calkText = new TextView(this);
        calkText.setText("Calk");
        calkText.setTextColor(Color.WHITE);
        calkText.setTextSize(TypedValue.COMPLEX_UNIT_SP, 32);
        calkText.setTypeface(Typeface.DEFAULT_BOLD);

        logoRow.addView(cryptoText);
        logoRow.addView(calkText);
        overlay.addView(logoRow);

        // Subtitle
        TextView subtitle = new TextView(this);
        subtitle.setText("Free Crypto Calculators");
        subtitle.setTextColor(Color.parseColor("#94a3b8"));
        subtitle.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
        subtitle.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams subtitleParams = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.WRAP_CONTENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        );
        subtitleParams.topMargin = 16;
        subtitle.setLayoutParams(subtitleParams);
        overlay.addView(subtitle);

        // Loading spinner
        ProgressBar spinner = new ProgressBar(this);
        spinner.setIndeterminate(true);
        LinearLayout.LayoutParams spinnerParams = new LinearLayout.LayoutParams(
            dpToPx(32), dpToPx(32)
        );
        spinnerParams.topMargin = dpToPx(32);
        spinner.setLayoutParams(spinnerParams);
        overlay.addView(spinner);

        rootView.addView(overlay);
        loadingOverlay = overlay;
    }

    private int dpToPx(int dp) {
        return (int) (dp * getResources().getDisplayMetrics().density);
    }
}
