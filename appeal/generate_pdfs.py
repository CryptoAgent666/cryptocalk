#!/usr/bin/env python3
"""Generate two PDF documents for Google Play appeal."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
)
from reportlab.lib import colors

# ── Shared styles ──────────────────────────────────────────────

FONT = "Helvetica"
FONT_BOLD = "Helvetica-Bold"
ACCENT = HexColor("#1a73e8")
DARK = HexColor("#202124")
GRAY = HexColor("#5f6368")
LIGHT_BG = HexColor("#f8f9fa")

title_style = ParagraphStyle(
    "DocTitle", fontName=FONT_BOLD, fontSize=18, leading=24,
    textColor=DARK, alignment=TA_CENTER, spaceAfter=6,
)
subtitle_style = ParagraphStyle(
    "Subtitle", fontName=FONT, fontSize=11, leading=14,
    textColor=GRAY, alignment=TA_CENTER, spaceAfter=20,
)
heading_style = ParagraphStyle(
    "Heading", fontName=FONT_BOLD, fontSize=13, leading=18,
    textColor=ACCENT, spaceBefore=18, spaceAfter=8,
)
subheading_style = ParagraphStyle(
    "SubHeading", fontName=FONT_BOLD, fontSize=11, leading=15,
    textColor=DARK, spaceBefore=12, spaceAfter=6,
)
body_style = ParagraphStyle(
    "Body", fontName=FONT, fontSize=10.5, leading=15,
    textColor=DARK, alignment=TA_JUSTIFY, spaceAfter=6,
)
bullet_style = ParagraphStyle(
    "Bullet", fontName=FONT, fontSize=10.5, leading=15,
    textColor=DARK, leftIndent=18, spaceAfter=4,
    bulletIndent=6, bulletFontName=FONT,
)
sig_style = ParagraphStyle(
    "Sig", fontName=FONT, fontSize=10.5, leading=20,
    textColor=DARK, spaceAfter=4,
)
small_style = ParagraphStyle(
    "Small", fontName=FONT, fontSize=9, leading=12,
    textColor=GRAY, alignment=TA_CENTER,
)

def hr():
    return HRFlowable(width="100%", thickness=0.5, color=HexColor("#dadce0"),
                       spaceAfter=12, spaceBefore=8)

# ── Document 1: Authorization Letter ──────────────────────────

def build_authorization_letter():
    doc = SimpleDocTemplate(
        "authorization-letter.pdf", pagesize=A4,
        leftMargin=2.5*cm, rightMargin=2.5*cm,
        topMargin=2.5*cm, bottomMargin=2.5*cm,
        title="Authorization Letter — CryptoCalk",
        author="Konstantin Iakovlev",
    )
    story = []

    # Header
    story.append(Paragraph("AUTHORIZATION LETTER", title_style))
    story.append(Paragraph("Regarding Android Application: CryptoCalk (com.cryptocalk.calculator)", subtitle_style))
    story.append(hr())

    # Date & To
    story.append(Paragraph("<b>Date:</b> March 31, 2026", body_style))
    story.append(Paragraph("<b>To:</b> Google Play Review Team, Google LLC", body_style))
    story.append(Paragraph("<b>From:</b> Konstantin Iakovlev — Owner &amp; Developer of cryptocalk.com", body_style))
    story.append(Spacer(1, 12))

    # Section 1
    story.append(Paragraph("1. Declaration of Ownership", heading_style))
    story.append(Paragraph(
        "I, <b>Konstantin Iakovlev</b>, hereby declare and confirm the following:",
        body_style
    ))
    story.append(Spacer(1, 4))

    bullets_1 = [
        "I am the <b>sole owner, creator, and administrator</b> of the website <b>cryptocalk.com</b>, which has been live and actively maintained since November 2025.",
        "I am the <b>sole developer and publisher</b> of the Android application <b>\"CryptoCalk: Crypto Calculator\"</b> (package name: <font face='Courier' size='9'>com.cryptocalk.calculator</font>), published under the developer account <b>\"Zainimaem.KZ\"</b> on Google Play.",
        "<b>All content</b> displayed within the CryptoCalk Android application — including calculators, text, designs, code, and graphics — is <b>my original work</b>, created and maintained exclusively by me.",
        "The Android application uses <b>Capacitor (by Ionic)</b> as a framework to deliver the web application as a native Android experience. The website and the app share the same codebase because <b>I am the author of both</b>.",
    ]
    for b in bullets_1:
        story.append(Paragraph(b, bullet_style, bulletText="\u2022"))

    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "I <b>fully authorize</b> the use of all content from cryptocalk.com within the CryptoCalk Android application. "
        "There is no third-party content being redistributed without permission.",
        body_style
    ))

    # Section 2
    story.append(Paragraph("2. Evidence of Website Ownership", heading_style))

    evidence_data = [
        ["Evidence", "Details"],
        ["Domain registrant", "Konstantin Iakovlev (verifiable via WHOIS for cryptocalk.com)"],
        ["Hosting", "Plesk panel at cloud-7.hoster.kz, account: Zainimaem.KZ"],
        ["Source code", "github.com/CryptoAgent666/cryptocalk — sole contributor"],
        ["Google Search Console", "cryptocalk.com verified under the same Google account as Play Console"],
        ["Google Analytics", "Property G-BVPMVV27NH for cryptocalk.com, same account"],
    ]
    t = Table(evidence_data, colWidths=[4.5*cm, 11.5*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), ACCENT),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_BOLD),
        ("FONTSIZE", (0, 0), (-1, -1), 9.5),
        ("LEADING", (0, 0), (-1, -1), 13),
        ("FONTNAME", (0, 1), (0, -1), FONT_BOLD),
        ("BACKGROUND", (0, 1), (-1, -1), LIGHT_BG),
        ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#dadce0")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(t)

    # Section 3
    story.append(Paragraph("3. About the Application", heading_style))
    story.append(Paragraph(
        "CryptoCalk is a suite of <b>69 free cryptocurrency calculators</b> covering profit/loss, mining profitability, "
        "DCA simulation, tax estimation, staking rewards, and more. The application is:",
        body_style
    ))
    bullets_3 = [
        "<b>Free</b> — no ads, no affiliate links, no data collection",
        "<b>Original</b> — all calculators and content developed from scratch by me",
        "<b>Multilingual</b> — available in 6 languages: English, Spanish, Portuguese, Turkish, Hindi, Russian",
        "<b>935 pages</b> of original content across all languages",
    ]
    for b in bullets_3:
        story.append(Paragraph(b, bullet_style, bulletText="\u2022"))

    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "The app is not a generic WebView wrapper or affiliate traffic driver. It is a <b>purpose-built calculator tool</b> "
        "that I developed from scratch. The web technology stack (Astro + React + Capacitor) is simply the technical approach "
        "I chose to deliver my original application on Android.",
        body_style
    ))

    # Signature block
    story.append(Spacer(1, 24))
    story.append(hr())
    story.append(Paragraph("4. Signature", heading_style))
    story.append(Spacer(1, 8))
    story.append(Paragraph("Signature: ___________________________________________", sig_style))
    story.append(Spacer(1, 20))
    story.append(Paragraph("Full name: <b>Konstantin Iakovlev</b>", sig_style))
    story.append(Paragraph("Role: Owner &amp; Developer, cryptocalk.com", sig_style))
    story.append(Paragraph("Date: March 31, 2026", sig_style))

    # Footer
    story.append(Spacer(1, 30))
    story.append(Paragraph(
        "This document serves as written authorization as required by Google Play's Webviews and Affiliate Spam policy.",
        small_style
    ))

    doc.build(story)
    print("Created: authorization-letter.pdf")


# ── Document 2: Appeal Text ───────────────────────────────────

def build_appeal_text():
    doc = SimpleDocTemplate(
        "appeal-text.pdf", pagesize=A4,
        leftMargin=2.5*cm, rightMargin=2.5*cm,
        topMargin=2.5*cm, bottomMargin=2.5*cm,
        title="Google Play Appeal — CryptoCalk",
        author="Konstantin Iakovlev",
    )
    story = []

    # Header
    story.append(Paragraph("GOOGLE PLAY APPEAL", title_style))
    story.append(Paragraph(
        "App: CryptoCalk: Crypto Calculator (com.cryptocalk.calculator)<br/>"
        "Policy: Webviews and Affiliate Spam<br/>"
        "Suspension date: March 31, 2026",
        subtitle_style
    ))
    story.append(hr())

    # Appeal body
    story.append(Paragraph("Dear Google Play Review Team,", body_style))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "I am writing to appeal the suspension of my application <b>\"CryptoCalk: Crypto Calculator\"</b> "
        "(package name: <font face='Courier' size='9'>com.cryptocalk.calculator</font>) "
        "for a violation of the Webviews and Affiliate Spam policy.",
        body_style
    ))
    story.append(Spacer(1, 8))

    story.append(Paragraph(
        "I believe this suspension was issued in error. <b>I am the sole owner of both the website "
        "(cryptocalk.com) and the Android application.</b> There is no unauthorized redistribution "
        "of third-party content.",
        body_style
    ))

    # Key facts
    story.append(Paragraph("Key Facts", heading_style))

    facts = [
        "<b>Same owner:</b> I, Konstantin Iakovlev, own the domain cryptocalk.com (verifiable via WHOIS) "
        "and publish the app under my company \"Zainimaem.KZ.\" Both the website and the app are my original creation.",

        "<b>Same codebase:</b> The website and app share the same codebase because I built both. "
        "I use Capacitor (by Ionic) to package my web application as a native Android app — "
        "a standard approach used by thousands of production apps on Google Play.",

        "<b>Original content:</b> The app contains <b>69 original cryptocurrency calculators</b> that I personally "
        "developed, covering profit/loss, mining, DCA, tax, staking, and more. All text, designs, "
        "and code are my own work.",

        "<b>No monetization abuse:</b> The app is completely free, contains no ads, no affiliate links, "
        "and collects no user data. It exists solely as a utility tool for the crypto community.",

        "<b>Account verification:</b> My Google Search Console verification for cryptocalk.com is under "
        "the <b>same Google account</b> as this Play Console, which independently confirms that "
        "the website owner and the app publisher are the same person.",
    ]
    for i, f in enumerate(facts, 1):
        story.append(Paragraph(f"{i}. {f}", bullet_style))
        story.append(Spacer(1, 4))

    # Attached documentation
    story.append(Paragraph("Attached Documentation", heading_style))

    docs_list = [
        "<b>Signed Authorization Letter</b> — confirming my ownership of both the website and the application, with evidence of domain ownership",
        "<b>WHOIS record</b> — showing cryptocalk.com registered to Konstantin Iakovlev",
        "<b>Google Search Console screenshot</b> — showing cryptocalk.com verified under this same Google account",
        "<b>Hosting panel screenshot</b> — showing cryptocalk.com hosted under Zainimaem.KZ account",
    ]
    for d in docs_list:
        story.append(Paragraph(d, bullet_style, bulletText="\u2022"))

    # Closing
    story.append(Spacer(1, 16))
    story.append(Paragraph(
        "I respectfully request the reinstatement of my application. I am fully available to provide "
        "any additional documentation or clarification that may be needed.",
        body_style
    ))
    story.append(Spacer(1, 16))
    story.append(Paragraph("Thank you for your time and consideration.", body_style))

    # Signature
    story.append(Spacer(1, 24))
    story.append(hr())
    story.append(Paragraph("Konstantin Iakovlev", ParagraphStyle(
        "SigName", fontName=FONT_BOLD, fontSize=11, leading=15, textColor=DARK
    )))
    story.append(Paragraph("Owner &amp; Developer, cryptocalk.com", sig_style))
    story.append(Paragraph("March 31, 2026", sig_style))

    doc.build(story)
    print("Created: appeal-text.pdf")


if __name__ == "__main__":
    build_authorization_letter()
    build_appeal_text()
