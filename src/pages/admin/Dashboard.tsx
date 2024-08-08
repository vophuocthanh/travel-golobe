import * as React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, Trash, Edit } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface GD {
  idgd: string;
  namegd: string;
  date: string;
  dongia: number;
  dientich: number;
  tenkh: string;
  sdt: string;
  mail: string;
}

export default function Dashboard() {
  const [posts, setPosts] = React.useState<GD[]>([]);
  const [newgd, setNewgd] = React.useState({
    idgd: '',
    namegd: '',
    date: '',
    dongia: '',
    dientich: '',
    tenkh: '',
    sdt: '',
    mail: '',
  });

  React.useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const url = 'http://localhost:8010/api/list';
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  const handleDelete = async (idgd: string) => {
    const url = `http://localhost:8010/api/delete/${idgd}`;
    await fetch(url, { method: 'DELETE' });
    getPosts(); // Refresh the list after deletion
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = 'http://localhost:8010/api/add';
    await axios.post(url, newgd);
    setNewgd({
      idgd: '',
      namegd: '',
      date: '',
      dongia: '',
      dientich: '',
      tenkh: '',
      sdt: '',
      mail: '',
    });
    getPosts(); // Refresh the list after adding new student
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewgd((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <Input placeholder="Search by name..." className="mr-4 max-w-xs" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Loại dịch vụ <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem checked={true}>Nhà đất</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-auto">Add New Giao dich</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Giao dich</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="student_name" className="block text-sm font-medium text-gray-700">Mã giao dịch</label>
                <Input
                  id="student_name"
                  name="student_name"
                  value={newgd.idgd}
                  onChange={handleInputChange}
                  placeholder="Mã giao dịch"
                />
              </div>
              <div>
                <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">Loại giao dịch</label>
                <Input
                  id="birth_date"
                  name="birth_date"
                  type="date"
                  value={newgd.namegd}
                  onChange={handleInputChange}
                  placeholder="Loại giao dịch"
                />
              </div>
              <div>
                <label htmlFor="class_id" className="block text-sm font-medium text-gray-700">Đơn giá (VND/m2)</label>
                <Input
                  id="class_id"
                  name="class_id"
                  type="number"
                  value={newgd.date}
                  onChange={handleInputChange}
                  placeholder="Đơn giá"
                />

              </div>
              <div>
                <label htmlFor="class_id" className="block text-sm font-medium text-gray-700">Diện tích(m2)</label>
                <Input
                  id="class_id"
                  name="class_id"
                  type="number"
                  value={newgd.dongia}
                  onChange={handleInputChange}
                  placeholder="Diện tích"
                />

              </div>
              <div>
                <label htmlFor="class_id" className="block text-sm font-medium text-gray-700">Tên Khách hàng</label>
                <Input
                  id="class_id"
                  name="class_id"
                  type="number"
                  value={newgd.dientich}
                  onChange={handleInputChange}
                  placeholder="Tên Khách hàng"
                />

              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white shadow-md rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Mã giao dịch</TableHead>
              <TableHead className="text-left">Loại giao dịch</TableHead>
              <TableHead className="text-left">Ngày Giao dịch</TableHead>
              <TableHead className="text-left">Đơn giá(VND/m2)</TableHead>
              <TableHead className="text-right">Tên khách hàng</TableHead>
              <TableHead className="text-right">Số điện thoại</TableHead>
              <TableHead className="text-right">Email</TableHead>
              <TableHead className="text-right">Chi tiết</TableHead>
              <TableHead className="text-right">Xóa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post: GD) => (
              <TableRow key={post.idgd}>
                <TableCell>{post.namegd}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.dongia}</TableCell>
                <TableCell>{post.dientich}</TableCell>
                <TableCell>{post.tenkh}</TableCell>
                <TableCell>{post.sdt}</TableCell>
                <TableCell>{post.mail}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    className="mr-2"
                    onClick={() => console.log('Edit')}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleDelete(post.idgd)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
