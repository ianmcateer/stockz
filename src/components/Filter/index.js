import React, { useState } from "react";
import { Input, Select } from "antd";
import { uniqBy } from "lodash";

import styles from "./styles.module.scss";
import { useApi } from "../../hooks/useApi";
import { stockScreener } from "../../services/requests";

const Filter = () => {
    const [filter, setFilter] = useState({});

    const [data] = useApi(stockScreener, filter);

    const unique = uniqBy(data, (item) => item.sector);

    const knownSectors = [
        "Technology",
        "Consumer Cyclical",
        "Communication Services",
        "Financial Services",
        "Industrials",
        "Healthcare",
        "Consumer Defensive",
        "Real Estate",
        "Energy",
        "Basic Materials",
        "Utilities",
    ];

    // for future use
    const knowIndustries = [
        "Consumer Electronics",
        "Internet Retail",
        "Internet Content & Information",
        "Auto Manufacturers",
        "Semiconductors",
        "Credit Services",
        "Semiconductor Equipment & Materials",
        "Entertainment",
        "Travel Services",
        "Railroads",
        "Software Application",
        "Diagnostics & Research",
        "Beverages Non-Alcoholic",
        "Consumer Packaged Goods",
        "Lodging",
        "Medical Devices",
        "Apparel Retail",
        "Retail Apparel & Specialty",
        "Information Technology Services",
        "Asset Management",
        "Software Infrastructure",
        "Specialty Business Services",
        "Specialty Retail",
        "Biotechnology",
        "Farm & Heavy Construction Machinery",
        "Trucking",
        "Industrial Distribution",
        "Banks Regional",
        "Communication Equipment",
        "Scientific & Technical Instruments",
        "Broadcasting",
        "Computer Hardware",
        "Solar",
        "Drug Manufacturers General",
        "Health Care Equipment & Services",
        "Resorts & Casinos",
        "Medical Instruments & Supplies",
        "Airlines",
        "Electrical Equipment & Parts",
        "Insurance Diversified",
        "Real Estate Services",
        "Oil & Gas E&P",
        "Conglomerates",
        "Auto Parts",
        "Specialty Industrial Machinery",
        "Capital Markets",
        "Online Media",
        "Steel",
        "REIT Specialty",
        "Banks Diversified",
        "Financial Data & Stock Exchanges",
        "Building Products & Equipment",
        "Telecom Services",
        "Electronic Components",
        "Gambling",
        "Recreational Vehicles",
        "Aerospace & Defense",
        "Tools & Accessories",
        "Leisure",
        "Silver",
        "Restaurants",
        "Integrated Freight & Logistics",
        "Rental & Leasing Services",
        "Waste Management",
        "Discount Stores",
        "Packaged Foods",
        "Health Information Services",
        "Banks",
        "Medical Care Facilities",
        "Footwear & Accessories",
        "Lumber & Wood Production",
        "Insurance Life",
        "Electronics & Computer Distribution",
        "Residential Construction",
        "REIT Healthcare Facilities",
        "Gold",
        "Manufacturing Apparel & Furniture",
        "Medical Distribution",
        "Furnishings, Fixtures & Appliances",
        "Insurance Specialty",
        "Drug Manufacturers General Specialty & Generic",
        "Mortgage Finance",
        "Home Improvement Retail",
        "Communication Services",
        "Chemicals",
        "",
        "Education & Training Services",
        "Homebuilding & Construction",
        "Oil & Gas Refining & Marketing",
        "Auto & Truck Dealerships",
        "Advertising Agencies",
        "Business Equipment & Supplies",
        "Oil & Gas Midstream",
        "Specialty Chemicals",
        "Health Care Plans",
        "Security & Protection Services",
        "Travel & Leisure",
        "REIT Hotel & Motel",
        "Personal Services",
        "REIT Retail",
        "Insurance Property & Casualty",
        "Financial Conglomerates",
        "Airports & Air Services",
        "Engineering & Construction",
        "Aluminum",
        "REIT Mortgage",
        "Marine Shipping",
        "REIT Office",
        "Transportation & Logistics",
        "Oil & Gas Drilling",
        "Food Distribution",
        "Staffing & Employment Services",
        "Building Materials",
        "Electronic Gaming & Multimedia",
        "Pollution & Treatment Controls",
        "Paper & Paper Products",
        "Farm Products",
        "Oil & Gas Equipment & Services",
        "Consulting Services",
        "Education",
        "Thermal Coal",
        "Luxury Goods",
        "Publishing",
        "Metal Fabrication",
        "Other Industrial Metals & Mining",
        "Insurance Reinsurance",
        "Advertising & Marketing Services",
        "Diversified Financials",
        "Utilities Regulated Water",
        "Household & Personal Products",
        "Consulting & Outsourcing",
        "Oil & Gas Services",
        "Other Precious Metals & Mining",
        "Business Services",
        "Textile Manufacturing",
        "Agricultural Inputs",
        "Real Estate Development",
        "Apparel Manufacturing",
        "Pharmaceutical Retailers",
        "Utilities Renewable",
        "Industrial Products",
        "Beverages Wineries & Distilleries",
        "Retail Defensive",
        "Medical Instruments & Equipment",
        "Brokers & Exchanges",
        "Autos",
        "Medical Diagnostics & Research",
        "Coal",
    ];

    const handleChange = (value, two) => {
        setFilter({
            sector: value,
        });
    };

    return (
        <div className={styles.filter}>
            <div className={styles.header}>
                <div>Screener</div>
            </div>
            <div className={styles.content}>
                <div className={styles.market}>
                    <div className={styles.filterTitle}>Market</div>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputTitle}>Sector</div>
                        <div className={styles.dropdown}>
                            <Input.Group compact name="sector">
                                <Select
                                    placeholder="sector"
                                    value={filter.sector}
                                    onChange={handleChange}
                                >
                                    {knownSectors.map((sector) => (
                                        <Select.Option value={sector}>
                                            {sector}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Input.Group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
