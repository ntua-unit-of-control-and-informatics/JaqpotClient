export interface DataEntry {
    entryId: EntryId;
    values: { [key: string]: any; };
}

export interface EntryId {
    name?: string;
    ownerUUID?: string;
    URI?: string;
    type?: string;
}

export interface ErrorReport {
    meta?: MetaInfo;

    ontologicalClasses?: Array<string>;

    visible?: boolean;

    temporary?: boolean;

    featured?: boolean;

    /**
     * Error code
     */
    code?: string;

    /**
     * Who is to blame
     */
    actor?: string;

    /**
     * Short error message
     */
    message?: string;

    /**
     * Details to be used for debugging.
     */
    details?: string;

    /**
     * Accompanying HTTP status.
     */
    httpStatus?: number;

    /**
     * Trace error report.
     */
    trace?: ErrorReport;

    id?: string;

}


export interface MetaInfo {
    identifiers?: Array<string>;

    comments?: Array<string>;

    descriptions?: Array<string>;

    titles?: Array<string>;

    subjects?: Array<string>;

    publishers?: Array<string>;

    creators?: Array<string>;

    contributors?: Array<string>;

    audiences?: Array<string>;

    rights?: Array<string>;

    sameAs?: Array<string>;

    seeAlso?: Array<string>;

    hasSources?: Array<string>;

    doi?: Array<string>;

    date?: Date;

    picture?: string;

    markdown?: string;

    tags?: Array<string>;

    read?: Array<string>;

    write?: Array<string>;

    execute?: Array<string>;
    
}

export interface Prediction {
    modelId?:string;
    datasetId?:string;
    data?:Array<{[key:string] : any}>;
    predictions?:Array<{[key:string] : any}>;
    // data?: Array<Pred>;
    // predictions?:Array<Pred>;
}

export interface Pred {
    entryId?: string;
    values?: {[key:string] : any};
}

export interface Chempot{
    modelId?: string;
    smiles?: string;
    descriptors?: string;
    withDoa?:boolean;
}

export interface Dataset {
    meta: MetaInfo;

    ontologicalClasses?: Array<string>;

    visible?: boolean;

    temporary?: boolean;

    featured?: boolean;

    datasetURI?: string;

    byModel?: string;

    dataEntry: Array<DataEntry>;

    features: Array<FeatureInfo>;

    totalRows?: number;

    totalColumns?: number;

    descriptors?: Array<Dataset.DescriptorsEnum>;

    existence?: Dataset.ExistenceEnum;

    _id?: string;

    onTrash?: boolean;

}
export namespace Dataset {
    export enum DescriptorsEnum {
        EXPERIMENTAL = <any> 'EXPERIMENTAL',
        IMAGE = <any> 'IMAGE',
        GO = <any> 'GO',
        MOPAC = <any> 'MOPAC',
        CDK = <any> 'CDK',
        PREDICTED = <any> 'PREDICTED',
        FORPREDICTION = <any> 'FORPREDICTION'
    }
}

export namespace Dataset {
    export enum ExistenceEnum {
        EXPERIMENTAL = <any> 'EXPERIMENTAL',
        UPLOADED = <any> 'UPLOADED',
        CREATED = <any> 'CREATED',
        TRANFORMED = <any> "TRANSFORMED",
        PREDICTED = <any> "PREDICTED",
        DESCRIPTORSADDED = <any> "DESCRIPTORSADDED",
        FORPREDICTION = <any> "FORPREDICTION"
    }
}

export interface FeatureInfo {
    key: string;
    name: string;
    units?: string;
    conditions?: { [key: string]: any; };
    category?: FeatureInfo.CategoryEnum;
    uri: string;
}

export interface Feature {
    meta?: MetaInfo;
    ontologicalClasses?: Array<string>;
    visible?: boolean;
    temporary?: boolean;
    featured?: boolean;
    units?: string;
    predictorFor?: string;
    admissibleValues?: Array<string>;
    id?: string;
    _id?: string;
}

export namespace FeatureInfo {
    export enum CategoryEnum {
        EXPERIMENTAL = <any> 'EXPERIMENTAL',
        IMAGE = <any> 'IMAGE',
        GO = <any> 'GO',
        MOPAC = <any> 'MOPAC',
        CDK = <any> 'CDK',
        PREDICTED = <any> 'PREDICTED'
    }
}


export interface Model {
    meta?: MetaInfo;
    ontologicalClasses?: Array<string>;
    visible?: boolean;
    temporary?: boolean;
    featured?: boolean;
    dependentFeatures?: Array<string>;
    independentFeatures?: Array<string>;
    predictedFeatures?: Array<string>;
    reliability?: number;
    datasetUri?: string;
    parameters?: { [key: string]: any; };
    algorithm?: Algorithm;
    bibtex?: BibTeX;
    actualModel?: any;
    pmmlModel?: any;
    additionalInfo?: any;
    pmmlTransformations?: string;
    doaModel?: string;
    transformationModels?: Array<string>;
    linkedModels?: Array<string>;
    id?: string;
    _id: string;
    onTrash?: boolean;
}

export interface BibTeX {
    meta?: MetaInfo;
    ontologicalClasses?: Array<string>;
    visible?: boolean;
    temporary?: boolean;
    featured?: boolean;
    author?: string;
    title?: string;
    bookTitle?: string;
    school?: string;
    chapter?: string;
    copyright?: string;
    edition?: string;
    editor?: string;
    crossref?: string;
    address?: string;
    year?: string;
    pages?: string;
    volume?: string;
    number?: string;
    journal?: string;
    isbn?: string;
    issn?: string;
    keywords?: string;
    key?: string;
    annotation?: string;
    series?: string;
    url?: string;
    bibType?: BibTeX.BibTypeEnum;
    publisher?: string;
    id?: string;
    abstract?: string;
}

export namespace BibTeX {
    export enum BibTypeEnum {
        Article = <any> 'Article',
        Book = <any> 'Book',
        Conference = <any> 'Conference',
        Phdthesis = <any> 'Phdthesis',
        Booklet = <any> 'Booklet',
        Inbook = <any> 'Inbook',
        Incollection = <any> 'Incollection',
        Inproceedings = <any> 'Inproceedings',
        Manual = <any> 'Manual',
        Mastersthesis = <any> 'Mastersthesis',
        Misc = <any> 'Misc',
        Proceedings = <any> 'Proceedings',
        TechReport = <any> 'TechReport',
        Unpublished = <any> 'Unpublished',
        Entry = <any> 'Entry'
    }
}

export interface Doa {
    meta?: MetaInfo;
    modelId?: string;
    doaMatrix?: number[][];
    aValue?: number;
}

export interface Task {
    meta?: MetaInfo;

    ontologicalClasses?: Array<string>;

    visible?: boolean;

    temporary?: boolean;

    featured?: boolean;

    resultUri?: string;

    result: string;

    percentageCompleted?: number;

    errorReport?: ErrorReport;

    httpStatus?: number;

    duration?: number;

    type?: Task.TypeEnum;

    id?: string;

    _id: string;

    status?: Task.StatusEnum;

}

export namespace Task {
    export enum TypeEnum {
        TRAINING = <any> 'TRAINING',
        PREDICTION = <any> 'PREDICTION',
        PREPARATION = <any> 'PREPARATION',
        VALIDATION = <any> 'VALIDATION'
    }
    export enum StatusEnum {
        RUNNING = <any> 'RUNNING',
        COMPLETED = <any> 'COMPLETED',
        CANCELLED = <any> 'CANCELLED',
        ERROR = <any> 'ERROR',
        REJECTED = <any> 'REJECTED',
        QUEUED = <any> 'QUEUED'
    }
}

export interface Models {
    total?:Number
    models?:Array<Model>
}
