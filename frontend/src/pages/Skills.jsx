import { PageHeader, Section } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loading, ErrorState } from "@/components/States";
import { api } from "@/lib/api";
import { useFetch } from "@/lib/useFetch";

function LevelDots({ level }) {
  return (
    <div className="flex gap-1" aria-label={`Level ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${i <= level ? "bg-primary" : "bg-muted"}`}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  const { data, loading, error } = useFetch(() => api.skills());

  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="Technical Skills"
        description="Tools and technologies I work with across the cloud lifecycle."
      />
      <Section>
        {loading && <Loading />}
        {error && <ErrorState error={error} />}
        {data && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.categories.map((cat) => (
              <Card key={cat.category}>
                <CardHeader>
                  <CardTitle>{cat.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cat.items.map((s) => (
                    <div key={s.id} className="flex items-center justify-between">
                      <span className="text-sm">{s.name}</span>
                      <LevelDots level={s.level} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
