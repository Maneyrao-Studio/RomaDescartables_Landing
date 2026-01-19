import { use } from 'react'
import PageLayout from "@/components/ui/page-layout"
import Catalog from "@/components/catalog"

interface CatalogoPageProps {
  searchParams: Promise<{ categoria?: string }>
}

export default function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = use(searchParams)

  return (
    <PageLayout>
      <Catalog categoriaFilter={params.categoria} />
    </PageLayout>
  )
}