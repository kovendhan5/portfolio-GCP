export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 w-40 bg-muted/50 rounded-lg animate-pulse mx-auto"></div>
            <div className="w-20 h-1 bg-muted/50 mx-auto rounded-full mt-2"></div>
            <div className="h-6 w-96 max-w-full bg-muted/50 rounded-lg animate-pulse mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border"
              >
                <div className="aspect-video w-full bg-muted/50 animate-pulse"></div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-4 w-20 bg-muted/50 rounded-full animate-pulse"></div>
                    <div className="h-4 w-16 bg-muted/50 rounded-full animate-pulse"></div>
                  </div>
                  <div className="h-6 w-full bg-muted/50 rounded-lg animate-pulse mb-2"></div>
                  <div className="h-4 w-full bg-muted/50 rounded-lg animate-pulse mb-2"></div>
                  <div className="h-4 w-2/3 bg-muted/50 rounded-lg animate-pulse mb-4"></div>
                  <div className="flex gap-2">
                    <div className="h-4 w-12 bg-muted/50 rounded-full animate-pulse"></div>
                    <div className="h-4 w-12 bg-muted/50 rounded-full animate-pulse"></div>
                    <div className="h-4 w-12 bg-muted/50 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
