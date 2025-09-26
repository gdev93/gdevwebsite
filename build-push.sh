#!/bin/bash

# Build and Push Script for gdevwebsite Docker Image
# Usage: ./build-and-push.sh

set -e  # Exit on any error

# Configuration
IMAGE_NAME="giacomodev93/gdevwebsite"
VERSION_FILE="version"
DOCKERFILE="Dockerfile"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to increment version
increment_version() {
    local version=$1
    local major minor patch

    # Split version into components
    IFS='.' read -r major minor patch <<< "$version"

    # Increment patch version
    patch=$((patch + 1))

    echo "${major}.${minor}.${patch}"
}

# Check if version file exists
if [ ! -f "$VERSION_FILE" ]; then
    log_error "Version file '$VERSION_FILE' not found"
    exit 1
fi

# Read current version from file
CURRENT_VERSION=$(cat "$VERSION_FILE" | tr -d '[:space:]')
if [ -z "$CURRENT_VERSION" ]; then
    log_error "Version file is empty"
    exit 1
fi

FULL_IMAGE_NAME="${IMAGE_NAME}:${CURRENT_VERSION}"

log_info "Starting build and push process for ${FULL_IMAGE_NAME}"
log_info "Current version: ${CURRENT_VERSION}"

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    log_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Dockerfile exists
if [ ! -f "$DOCKERFILE" ]; then
    log_error "Dockerfile not found in current directory"
    exit 1
fi

# Build and push the image
log_info "Building and pushing docker image: ${FULL_IMAGE_NAME}"
if docker buildx build --push --platform linux/amd64,linux/arm64 -t "${FULL_IMAGE_NAME}" -f "$DOCKERFILE" .; then
    log_success "Docker image built and pushed successfully"

    # Increment version and update file
    NEW_VERSION=$(increment_version "$CURRENT_VERSION")
    echo "$NEW_VERSION" > "$VERSION_FILE"
    log_success "Version incremented from ${CURRENT_VERSION} to ${NEW_VERSION}"

else
    log_error "Failed to build and push Docker image"
    exit 1
fi

log_success "All done! 🚀"
log_info "Next build will use version: ${NEW_VERSION}"