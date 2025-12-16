import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import { Card, CardContent } from './ui/card'

const AppliedJobTable = () => {
  const {allAppliedJobs} = useSelector(store => store.job)
  console.log(allAppliedJobs);
  
  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardContent className="p-0">
        <Table>
          <TableCaption className="caption-top mb-4 text-lg font-semibold text-gray-800">
            A list of your applied services
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-semibold text-gray-700">Date</TableHead>
              <TableHead className="font-semibold text-gray-700">Service Role</TableHead>
              <TableHead className="font-semibold text-gray-700">Company</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  You haven&apos;t applied for any service yet.
                </TableCell>
              </TableRow>
            ) : (
              allAppliedJobs.map((job) => (
                <TableRow key={job?._id} className="border-b border-gray-200 last:border-b-0">
                  <TableCell className="text-gray-600">{job?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="font-medium text-gray-800">{job?.job.title}</TableCell>
                  <TableCell className="text-gray-600">{job?.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      className={`
                        ${job?.status === "rejected" ? 'bg-red-100 text-red-800' : 
                          job.status === "pending" ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'} 
                        px-2 py-1 rounded-full text-xs font-semibold
                      `}
                    >
                      {job?.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AppliedJobTable

