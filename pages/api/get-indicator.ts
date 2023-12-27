import { getDataMetaVerse } from "@/lib/serverFunctions";
import { jsonParse } from "@/utils/helper";

const getIndicator = async (req: any, res: any) => {
  const command: string = req.query?.command || "kpiIndicatorChartDataConfig";
  const parameters = req.query?.parameters || {};
  const lang = req.query?.lang || "mn";

  try {
    const result = await getDataMetaVerse(command, jsonParse(parameters));
    res.status(200).json(result);
  } catch (error) {
    console.log("errorerror :>> ", error);
    res.status(500).json({ error });
  }
};

export default getIndicator;
