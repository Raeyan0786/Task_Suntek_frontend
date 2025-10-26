import {  useEffect, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import api from "@/api/client";
import { useTaskStore, type Task } from "@/stores/taskStore";




const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Email is required"),
  description: yup
    .string()
    .required("Enter your Name")
});

type PropsType = {
  isUpdate?: boolean;
  taskData?: Task;
};

const  AddOrUpdateTask: FC<PropsType> = ({
  isUpdate = false,
  taskData,
//   refetch,
}: PropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const editorTriggertext = `${isUpdate ? "Edit User" : "Add User"}`;
  const {
      fetchTasks,
      fetchSummary,
    } = useTaskStore()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description:""
    },
  });

  const onSubmit = async(data: any) => {
    if (isUpdate === false) {
      const obj = {
        title:data.title,
        description:data.description
      };
      await api.post('/tasks', obj)
    //   AddUser(obj);
    } else if (isUpdate === true) {
      const obj = {
        title:data.title,
        description:data.description
      };
      await api.put(`/tasks/${taskData?._id}`, obj)
    }
  await  fetchTasks()
  await  fetchSummary();
    setIsOpen(false)
  };

  useEffect(() => {
    if (isUpdate === true && taskData) {
      setValue("title", taskData.title);
      setValue("description", taskData.description);
    }
  }, [taskData]);
  console.log("task data",isUpdate,taskData)
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={()=>{
        setIsOpen(!isOpen)
        if(!isUpdate){
            reset({})
        }
    
      }}>
        <DialogTrigger asChild>
          {isUpdate ? (
            <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-square-pen-icon lucide-square-pen text-brand"
              >
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
              </svg>
            </div>
          ) : (
            <Button className="w-fit px-5 cursor-pointer">Add User</Button>
          )}
        </DialogTrigger>
        <DialogContent className="mb-[10]   max-h-[40.6875rem]  lg:max-w-[35rem] p-0">
          <DialogHeader className="border-lightGray bg-cultured h-[3.875rem] rounded-t-lg border-b text-left justify-center ">
            <DialogTitle className=" lg:p-[1.56rem] text-lg font-semibold leading-5 px-2">
              {isUpdate ? "Edit User" : "Add New User"}
            </DialogTitle>
          </DialogHeader>
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="space-y-4">
                {/* Email Field */}

                {/* Full Name Field */}
                <div className="grid grid-cols-1 gap-4 mb-2">
                  <div>
                    <Label
                      htmlFor="title"
                      className="mb-2 block font-bold text-default-600"
                    >
                      Title
                    </Label>
                    <Input
                      {...register("title")}
                      type="text"
                      id="title"
                      className={cn("", {
                        "border-destructive": errors.title,
                      })}
                      //size={!isDesktop2xl ? "xl" : "lg"}
                      placeholder="Enter title"
                    />
                    {errors.title && (
                      <div className="text-destructive mt-2">
                        {errors.title.message}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="description"
                    className="mb-2 block font-bold text-default-600"
                  >
                    Description
                  </Label>
                  <Input
                    {...register("description")}
                    type="description"
                    id="description"
                    className={cn("", { "border-destructive": errors.description })}
                    placeholder=" Enter description "
                  />
                  {errors.description && (
                    <div className="text-destructive mt-2">
                      {errors.description.message}
                    </div>
                  )}
                </div>

                <Button className="w-full cursor-pointer">{editorTriggertext}</Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};


export default AddOrUpdateTask