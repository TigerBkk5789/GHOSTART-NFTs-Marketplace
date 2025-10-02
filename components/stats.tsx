export function Stats() {
  const stats = [
    { label: "Floor Price", value: "12.5 WLD" },
    { label: "Volume Price", value: "2.5K WLD" },
    { label: "Total Volume", value: "277.7M GHOSTART" },
    { label: "24h Change", value: "+15.5%", positive: true },
  ]

  return (
    <section className="border-b border-border/40 bg-secondary/30">
      <div className="container px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <div className={`text-3xl font-bold md:text-4xl ${stat.positive ? "text-green-400" : ""}`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
