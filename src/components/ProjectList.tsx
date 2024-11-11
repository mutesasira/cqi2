import { InstanceDisplay, Program } from "@/interfaces";
import { Spacer, Stack } from "@chakra-ui/react";
import { useLoaderData, useNavigate, useSearch } from "@tanstack/react-router";
import { Button, Table, TableProps, Tooltip } from "antd";
import { range } from "lodash";
import { useMemo } from "react";

const maxLength = 40;

const truncateText = (text: string) => {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...`;
    }
    return text;
};

export default function ProjectList({
    data: { processed, total, currentProgram },
}: {
    data: {
        processed: InstanceDisplay[];
        total: number;
        currentProgram: Partial<Program>;
    };
}) {
    const search = useSearch({ from: "/dashboards/$id" });
    const navigate = useNavigate({ from: "/dashboards/$id" });
    const { indicators, options } = useLoaderData({ from: "/dashboards" });
    const processedIndicators = indicators
        .filter((i) =>
            processed
                .map((a) => a.attributesObject?.["kHRn35W3Gq4"])
                .includes(i.event),
        )
        .reduce<Record<string, Record<string, string>>>((acc, i) => {
            acc[i.event] = i;
            return acc;
        }, {});

    const processedOptions = options.reduce<Record<string, string>>(
        (acc, i) => {
            acc[i.code] = i.name;
            return acc;
        },
        {},
    );

    console.log(processedIndicators);

    const columns: TableProps<InstanceDisplay>["columns"] = useMemo(
        () =>
            currentProgram.programTrackedEntityAttributes?.flatMap(
                ({ trackedEntityAttribute: { id, name }, displayInList }) => {
                    if (displayInList) {
                        if (id === "kHRn35W3Gq4") {
                            return [
                                {
                                    title: name,
                                    ellipsis: true,
                                    key: id,
                                    render: (_, row) => {
                                        const indicatorName =
                                            processedIndicators[
                                                row.attributesObject?.[
                                                    "kHRn35W3Gq4"
                                                ] ?? ""
                                            ]?.["kToJ1rk0fwY"] ?? "";
                                        return (
                                            <Tooltip title={indicatorName}>
                                                <span>
                                                    {truncateText(
                                                        indicatorName,
                                                    )}
                                                </span>
                                            </Tooltip>
                                        );
                                    },
                                },
                                {
                                    title: "Numerator",
                                    ellipsis: true,
                                    key: id,
                                    render: (_, row) => {
                                        const numName =
                                            processedIndicators[
                                                row.attributesObject?.[
                                                    "kHRn35W3Gq4"
                                                ] ?? ""
                                            ]?.["WI6Qp8gcZFX"] ?? "";
                                        return (
                                            <Tooltip title={numName}>
                                                <span>
                                                    {truncateText(numName)}
                                                </span>
                                            </Tooltip>
                                        );
                                    },
                                },
                                {
                                    title: "Denominator",
                                    ellipsis: true,
                                    key: id,
                                    render: (_, row) => {
                                        const denName =
                                            processedIndicators[
                                                row.attributesObject?.[
                                                    "kHRn35W3Gq4"
                                                ] ?? ""
                                            ]?.["krwzUepGwj7"] ?? "";
                                        return (
                                            <Tooltip title={denName}>
                                                <span>
                                                    {truncateText(denName)}
                                                </span>
                                            </Tooltip>
                                        );
                                    },
                                },
                            ];
                        }
                        return {
                            title: name,
                            ellipsis: true,
                            key: id,
                            render: (_, row) => {
                                if (id === "kHRn35W3Gq4") {
                                    const indicatorName =
                                        processedIndicators[
                                            row.attributesObject?.[
                                                "kHRn35W3Gq4"
                                            ] ?? ""
                                        ]?.["kToJ1rk0fwY"] ?? "";
                                    return (
                                        <Tooltip title={indicatorName}>
                                            <span>
                                                {truncateText(indicatorName)}
                                            </span>
                                        </Tooltip>
                                    );
                                }
                                if (id === "TG1QzFgGTex") {
                                    const programArea =
                                        processedOptions[
                                            row.attributesObject?.[
                                                "TG1QzFgGTex"
                                            ] ?? ""
                                        ];
                                    return (
                                        <Tooltip title={programArea}>
                                            <span>
                                                {truncateText(programArea)}
                                            </span>
                                        </Tooltip>
                                    );
                                }
                                if (
                                    [
                                        "VWxBILfLC9s",
                                        "WEudJ6nxlzz",
                                        "kHRn35W3Gq4",
                                        "EvGGaaviqOn",
                                        "eCbusIaigyj",
                                        "AETf2xvUmc8",
                                        "rFSjQbZjJwF",
                                    ].includes(id)
                                ) {
                                    return (
                                        <Tooltip
                                            title={row.attributesObject?.[id]}
                                        >
                                            <span>
                                                {truncateText(
                                                    row.attributesObject?.[
                                                        id
                                                    ] ?? "",
                                                )}
                                            </span>
                                        </Tooltip>
                                    );
                                }
                                return row.attributesObject?.[id];
                            },
                        };
                    }
                    return [];
                },
            ),
        [
            currentProgram.programTrackedEntityAttributes,
            processedIndicators,
            processedOptions,
        ],
    );

    const performanceColumns: TableProps<InstanceDisplay>["columns"] = useMemo(
        () =>
            range(12).map((i) => ({
                title: `Period ${i + 1}`,
                key: i,
                children: [
                    {
                        title: "N",
                        render: (_, row) => row.attributesObject?.[`${i}n`],
                    },
                    {
                        title: "D",
                        render: (_, row) => row.attributesObject?.[`${i}d`],
                    },
                ],
            })),
        [],
    );
    return (
        <Stack>
            <Stack direction="row">
                <Spacer />
                <Button
                    type="primary"
                    shape="round"
                    style={{
                        backgroundColor: "#4CAF50",
                        borderColor: "#4CAF50",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        fontWeight: "bold",
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#45A049")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#4CAF50")
                    }
                >
                    Download Projects
                </Button>
            </Stack>
            <Table
                scroll={{ x: "max-content", y: 510 }}
                bordered
                style={{ whiteSpace: "nowrap" }}
                columns={[...(columns ?? []), ...performanceColumns]}
                dataSource={processed}
                rowKey="trackedEntityInstance"
                pagination={{
                    pageSize: search.pageSize,
                    total,
                    current: search.page,
                    onChange: (page, pageSize) => {
                        navigate({
                            search: (s) => {
                                if (pageSize !== search.pageSize) {
                                    return {
                                        ...s,
                                        page: 1,
                                        pageSize,
                                    };
                                }
                                return { ...s, page };
                            },
                        });
                    },
                }}
            />
        </Stack>
    );
}
