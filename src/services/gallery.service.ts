// Gallery Service - Loads images from public/images folder
export class GalleryService {
  private images: string[] = [];
  private currentImageIndex: number = 0;

  // Define your image filenames here
  // These should match the actual files in public/images/
  private readonly imageFiles = [
    'henna-1.jpg',
    'henna-2.jpg',
    'henna-3.jpg',
    'henna-4.jpg',
    'henna-5.jpg',
    'henna-6.jpg',
    'henna-7.jpg',
    'henna-8.jpg',
    'henna-9.jpg',
    'henna-10.jpg',
  ];

  constructor() {
    this.loadImages();
  }

  private loadImages(): void {
    // Build image paths
    const basePath = window.location.pathname.includes('/Henna/') ? '/Henna' : '';
    this.images = this.imageFiles.map(filename => `${basePath}/images/${filename}`);
  }

  getAllImages(): string[] {
    return this.images;
  }

  getImage(index: number): string {
    return this.images[index] || this.images[0];
  }

  getTotalImages(): number {
    return this.images.length;
  }

  renderGallery(_containerId: string): void {
    // For infinite carousel, we'll render into two separate rows
    this.renderCarouselRow('gallery-row-1', 0, 5);  // First 5 images
    this.renderCarouselRow('gallery-row-2', 5, 10); // Last 5 images
    
    console.log(`✅ Gallery carousel rendered with ${this.images.length} images`);
  }

  private renderCarouselRow(rowId: string, startIndex: number, endIndex: number): void {
    const row = document.getElementById(rowId);
    if (!row) {
      console.error(`Gallery row ${rowId} not found`);
      return;
    }

    // Clear existing content
    row.innerHTML = '';

    // Get images for this row
    const rowImages = this.images.slice(startIndex, endIndex);

    // Create images twice for infinite loop effect
    const allImages = [...rowImages, ...rowImages, ...rowImages]; // Triple for smooth infinite

    allImages.forEach((imagePath, index) => {
      const actualIndex = (startIndex + (index % rowImages.length));
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item overflow-hidden rounded-2xl shadow-lg cursor-pointer';
      
      galleryItem.innerHTML = `
        <img 
          src="${imagePath}" 
          alt="Henna Design ${actualIndex + 1}" 
          class="w-full h-80 object-cover"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1610844012709-35bc3c4aac75?w=500&h=500&fit=crop'"
        >
      `;

      // Add click handler for modal
      galleryItem.addEventListener('click', () => {
        this.openImageModal(actualIndex);
      });

      row.appendChild(galleryItem);
    });
  }

  private openImageModal(index: number): void {
    this.currentImageIndex = index;
    const modalImage = document.getElementById('modalImage') as HTMLImageElement;
    const modal = document.getElementById('imageModal');
    
    if (modalImage && modal) {
      modalImage.src = this.images[index];
      modal.style.display = 'block';
      
      // Update counter
      this.updateCounter();
      
      // Setup navigation
      this.setupModalNavigation();
      this.setupNavigationButtons();
    }
  }

  private setupNavigationButtons(): void {
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');

    if (prevBtn) {
      prevBtn.onclick = () => this.previousImage();
    }

    if (nextBtn) {
      nextBtn.onclick = () => this.nextImage();
    }
  }

  private updateCounter(): void {
    const currentNumEl = document.getElementById('currentImageNum');
    const totalNumEl = document.getElementById('totalImagesNum');

    if (currentNumEl) {
      currentNumEl.textContent = (this.currentImageIndex + 1).toString();
    }

    if (totalNumEl) {
      totalNumEl.textContent = this.images.length.toString();
    }
  }

  private setupModalNavigation(): void {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        this.nextImage();
      } else if (e.key === 'ArrowLeft') {
        this.previousImage();
      } else if (e.key === 'Escape') {
        this.closeModal();
        document.removeEventListener('keydown', handleKeyPress);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
  }

  private nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    this.updateModalImage();
    this.updateCounter();
  }

  private previousImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    this.updateModalImage();
    this.updateCounter();
  }

  private updateModalImage(): void {
    const modalImage = document.getElementById('modalImage') as HTMLImageElement;
    if (modalImage) {
      modalImage.src = this.images[this.currentImageIndex];
    }
  }

  private closeModal(): void {
    const modal = document.getElementById('imageModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}

export const galleryService = new GalleryService();