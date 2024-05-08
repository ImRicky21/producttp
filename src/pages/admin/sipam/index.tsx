import SipamView from "@/components/views/admin/sipam";
import sipamService from "@/services/sipam";
import { Sipam } from "@/types/sipam.type";
import { useEffect, useState } from "react";

type PropsTypes = {
  sipams: Sipam[];
};
export default function SipamPage() {
  const [sipam, setSipam] = useState<Sipam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getAllSipam = async () => {
      const { data } = await sipamService.getAllSipam();
      setSipam(data.data);
      setIsLoading(false);
    };
    getAllSipam();
  }, []);
  console.log(sipam);

  return <SipamView sipams={sipam} />;
}
