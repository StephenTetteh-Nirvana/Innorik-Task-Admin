import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
      <Card>
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="font-semibold w-[250px] text-3xl">
            $1,250.00
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Total Followers</CardDescription>
          <CardTitle className="font-semibold w-[250px] text-3xl">
            1,234
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Total Books</CardDescription>
          <CardTitle className="font-semibold w-[250px] text-3xl">
            45
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Purchase Rate</CardDescription>
          <CardTitle className="font-semibold w-[250px] text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  )
}

export default DashboardCards
