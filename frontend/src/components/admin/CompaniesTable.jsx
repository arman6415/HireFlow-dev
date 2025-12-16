import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Calendar, Trash2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { setCompanies } from '@/redux/companySlice'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if (!searchCompanyByText) {
        return true
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    })
    setFilterCompany(filteredCompany)
  }, [companies, searchCompanyByText])

  const deleteCompanyHandler = async (companyId) => {
    try {
      const res = await axios.delete(`${COMPANY_API_END_POINT}/${companyId}`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setCompanies(companies.filter(company => company._id !== companyId)));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // Check if companies is an array and if it's empty
  if (!Array.isArray(companies) || companies.length === 0) {
    return <span className="text-gray-500 font-semibold">Company Not Found!</span>;
  }

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      <Table className="w-full">
        <TableCaption>A list of your recently registered Companies</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-900">
            <TableHead className="text-gray-200">Logo</TableHead>
            <TableHead className="text-gray-200">Name</TableHead>
            <TableHead className="text-gray-200">Date</TableHead>
            <TableHead className="text-right text-gray-200">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.map((company) => (
            <TableRow key={company._id} className="border-b border-gray-200 hover:bg-gray-50">
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} alt={company.name} />
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{company.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Calendar className="mr-2 text-gray-500" size={16} />
                  {new Date(company.createdAt).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-2 rounded-full hover:bg-gray-200">
                      <MoreHorizontal size={20} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="flex flex-col space-y-2">
                      <button 
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center space-x-2 text-gray-700 hover:text-black"
                      >
                        <Edit2 size={18} />
                        <span>Update</span>
                      </button>
                      <button 
                        onClick={() => deleteCompanyHandler(company._id)}
                        className="flex items-center space-x-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;

