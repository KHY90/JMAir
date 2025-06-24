export interface InstallResponse {
    installId: number;
    installDescription: string;
    installName: string;
    requestDate: string;
    installStatus: string;
    registeredUserGrade: string;
  }
  
  export interface CleanResponse {
    cleanId: number;
    cleanDescription: string;
    cleanName: string;
    requestDate: string;
    cleanStatus: string;
    registeredUserGrade: string;
  }
  
  export interface ServiceResponse {
    asId: number;
    asDescription: string;
    asName: string;
    asStartTime: string;
    asStatus: string;
    registeredUserGrade: string;
  }
  
  export interface ASItemExtended {
    id: number;
    title: string;
    applicant: string;
    date: string;
    installStatus: string;
    registeredUserGrade: string;
    type: "견적" | "세척" | "A/S";
  }
  