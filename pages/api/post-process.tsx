import { postProcess } from "@/lib/serverFunctions";
import { jsonParse } from "@/utils/helper";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  const command = req.body.processcode || "";
  const parameters = req.body.parameters || {};
  const config = req.body.headerParam || "";

  try {
    const result = await postProcess(command, parameters);
    res.status(200).json(result);
  } catch (error) {
    console.log("nem error ,", error);
    res.status(500).json({ error });
  }
};
