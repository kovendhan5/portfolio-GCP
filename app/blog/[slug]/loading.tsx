export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="h-6 w-32 bg-muted/50 rounded-lg animate-pulse mb-8"></div>

            <div className="bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border shadow-lg">
              <div className="aspect-video w-full bg-muted/50 animate-pulse"></div>

              <div className="p-6 md:p-8">
                <div className="flex gap-3 mb-4">
                  <div className="h-6 w-24 bg-muted/50 rounded-full animate-pulse"></div>
                  <div className="h-6 w-32 bg-muted/50 rounded-full animate-pulse"></div>
                </div>

                <div className="h-10 w-3/4 bg-muted/50 rounded-lg animate-pulse mb-6"></div>

                <div className="flex gap-2 mb-8">
                  <div className="h-6 w-16 bg-muted/50 rounded-full animate-pulse"></div>
                  <div className="h-6 w-16 bg-muted/50 rounded-full animate-pulse"></div>
                  <div className="h-6 w-16 bg-muted/50 rounded-full animate-pulse"></div>
                </div>

                <div className="space-y-4">
                  <div className="h-6 w-full bg-muted/50 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-full bg-muted/50 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-3/4 bg-muted/50 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-full bg-muted/50 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-5/6 bg-muted/50 rounded-lg animate-pulse"></div>
                  <div className="h-6 w-full bg-muted/50 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
