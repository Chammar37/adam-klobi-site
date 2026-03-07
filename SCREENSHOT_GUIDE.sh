#!/bin/bash

# Script to help switch between page title prototypes and take screenshots
# Usage: ./SCREENSHOT_GUIDE.sh

echo "=== Page Title Prototypes Screenshot Guide ==="
echo ""
echo "This script will show you how to switch prototypes and where to save screenshots."
echo ""

CSS_FILE="src/components/PageTitle.css"

# Function to activate prototype
activate_prototype() {
  local proto=$1
  case $proto in
    A)
      echo "Activating PROTOTYPE A (Nav-Aligned Label)..."
      sed -i '' '4,20s/^/\/\* /' "$CSS_FILE"
      sed -i '' '4,20s/$/ \*\//' "$CSS_FILE"
      sed -i '' '45s/^\/\* //' "$CSS_FILE"
      sed -i '' '63s/ \*\///g' "$CSS_FILE"
      echo "✓ PROTOTYPE A activated"
      ;;
    B)
      echo "Activating PROTOTYPE B (Centered Heading)..."
      sed -i '' '4,20s/^\/\* //' "$CSS_FILE"
      sed -i '' '4,20s/ \*\///g' "$CSS_FILE"
      sed -i '' '45s/^/.\/\* /' "$CSS_FILE"
      sed -i '' '63s/$/ \*\//' "$CSS_FILE"
      echo "✓ PROTOTYPE B activated"
      ;;
    C)
      echo "Activating PROTOTYPE C (Vertical Side Label)..."
      sed -i '' '4,20s/^\/\* //' "$CSS_FILE"
      sed -i '' '4,20s/ \*\///g' "$CSS_FILE"
      sed -i '' '74s/^\/\* //' "$CSS_FILE"
      sed -i '' '90s/ \*\///g' "$CSS_FILE"
      echo "✓ PROTOTYPE C activated"
      ;;
    D)
      echo "Activating PROTOTYPE D (Giant Watermark)..."
      sed -i '' '4,20s/^\/\* //' "$CSS_FILE"
      sed -i '' '4,20s/ \*\///g' "$CSS_FILE"
      sed -i '' '101s/^\/\* //' "$CSS_FILE"
      sed -i '' '117s/ \*\///g' "$CSS_FILE"
      echo "✓ PROTOTYPE D activated"
      ;;
    *)
      echo "Invalid prototype. Choose A, B, C, or D"
      exit 1
      ;;
  esac
}

echo "To manually switch prototypes:"
echo ""
echo "1. Open src/components/PageTitle.css in your editor"
echo ""
echo "For PROTOTYPE A (Nav-Aligned Label - Dominic Fike style):"
echo "  - Comment out lines 4-20 (current .page-title)"
echo "  - Uncomment lines 45-63 (PROTOTYPE A code)"
echo "  - Save"
echo ""
echo "For PROTOTYPE B (Centered Heading - Post Malone style) - DEFAULT:"
echo "  - Keep lines 4-20 active"
echo "  - Comment out any other prototypes"
echo "  - Save"
echo ""
echo "For PROTOTYPE C (Vertical Side Label - Jack Harlow style):"
echo "  - Comment out lines 4-20 (current .page-title)"
echo "  - Uncomment lines 74-90 (PROTOTYPE C code)"
echo "  - Save"
echo ""
echo "For PROTOTYPE D (Giant Watermark - Editorial style):"
echo "  - Comment out lines 4-20 (current .page-title)"
echo "  - Uncomment lines 101-117 (PROTOTYPE D code)"
echo "  - Save"
echo ""
echo "2. After switching, the browser will hot-reload automatically"
echo ""
echo "3. Take screenshots and save them:"
echo "   - Tour page: prototype-screenshots/tour/prototype-[A/B/C/D].png"
echo "   - Music page: prototype-screenshots/music/prototype-[A/B/C/D].png"
echo ""
echo "Then run: git add prototype-screenshots/ && git commit"
echo ""
